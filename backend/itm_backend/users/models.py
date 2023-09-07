from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import UserManager as DefaultUserManager
from django.core.exceptions import ValidationError
from django.db import models
from django_resized import ResizedImageField
from phonenumber_field.modelfields import PhoneNumberField


class CustomUserManager(DefaultUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")

        email = self.normalize_email(email)

        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        return self.create_user(email, password, **extra_fields)


class User(AbstractUser):
    """
    Кастомная модель пользователя.
    Регистрация с помощью email.
    """

    def validate_photo(fieldfile_obj):
        filesize = fieldfile_obj.file.size
        megabyte_limit = 5.0
        if filesize > megabyte_limit * 1024 * 1024:
            raise ValidationError("Максимальный размер файла для аватарки %sMB" % str(megabyte_limit))

    username = models.CharField("Логин", max_length=150, blank=True, unique=False)
    email = models.EmailField(
        verbose_name="адрес электронной почты",
        help_text="example@site.mail",
        unique=True,
    )
    password = models.CharField(max_length=150, verbose_name="Пароль")
    first_name = models.CharField(
        verbose_name="Имя",
        help_text="Иван",
        max_length=30,
    )
    last_name = models.CharField(
        verbose_name="Фамилия",
        help_text="Иванов",
        max_length=30,
    )
    role = models.CharField(
        verbose_name="Должность",
        help_text="Ваша должность",
        max_length=50,
        blank=True,
    )
    created_at = models.DateTimeField(verbose_name="Дата регистрации пользователя", auto_now_add=True)
    update_at = models.DateTimeField(verbose_name="Дата обновления данных пользователя", auto_now=True)
    is_active = models.BooleanField(verbose_name="Активный пользователь", default=True, blank=True, null=True)
    timezone = models.ForeignKey(
        "TimeZone",
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
        related_name="users",
        verbose_name="Часовой пояс пользователя",
    )
    work_start = models.TimeField(verbose_name="Время начала работы", blank=True, null=True)
    work_finish = models.TimeField(verbose_name="Время окончания работы", blank=True, null=True)
    photo = ResizedImageField(
        "Аватар пользователя",
        upload_to="media/",
        size=[400, 400],
        blank=True,
        null=True,
        validators=[validate_photo],
    )
    telephone_number = PhoneNumberField(verbose_name="Номер телефона", blank=True, null=True)
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["password", "first_name", "last_name"]

    objects = CustomUserManager()

    class Meta:
        verbose_name = "Пользователь"
        verbose_name_plural = "Пользователи"

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

    def clean(self):
        if self.photo:
            if (self.photo.width < 400 and self.photo.height < 100) or (
                    self.photo.height < 400 and self.photo.width < 100):
                raise ValidationError({"image": "Минимальный размер картинки 400 пикселей."})
        return super().clean()

    def save(self, *args, **kwargs):
        self.full_clean()
        if not self.username:
            self.username = self.email
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        self.is_active = False
        super().save(*args, **kwargs)


class TimeZone(models.Model):
    """Модель часового пояса"""

    value = models.CharField(verbose_name="Наименование", max_length=150)
    label = models.CharField(verbose_name="Значение", max_length=250, blank=True)
    offset = models.SmallIntegerField(
        verbose_name="Смещение от UTC",
    )
    abbrev = models.CharField(verbose_name="Аббревиатура", max_length=50, blank=True)
    altName = models.CharField(verbose_name="Условное наименование", max_length=150, blank=True)

    class Meta:
        verbose_name = "Часовой пояс"
        verbose_name_plural = "Часовые пояса"

    def __str__(self):
        return f"{self.value}"
