from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import UserManager as DefaultUserManager
from django.db import models
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

    username = models.CharField("Логин", max_length=150, blank=True, unique=False)

    email = models.EmailField(verbose_name="адрес электронной почты", help_text="example@site.mail", unique=True)
    password = models.CharField(max_length=22, verbose_name="Пароль")
    first_name = models.CharField(
        verbose_name="Имя",
        help_text="Иван",
        max_length=30,
    )
    last_name = models.CharField(
        verbose_name="Фамилия",
        help_text="Иванов",
        max_length=30,
        blank=True,
    )
    role = models.CharField(
        verbose_name="Должность",
        help_text="Ваша должность",
        max_length=50,
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
    work_start = models.TimeField(verbose_name="Время начала работы", null=True)
    work_finish = models.TimeField(verbose_name="Время окончания работы", null=True)
    photo = models.ImageField(verbose_name="Аватар пользователя", upload_to="media/", blank=True, null=True)
    telephone_number = PhoneNumberField(verbose_name="Номер телефона", blank=True, null=True)
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["password", "first_name", "last_name"]

    objects = CustomUserManager()

    class Meta:
        verbose_name = "Пользователь"
        verbose_name_plural = "Пользователи"

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

    def save(self, *args, **kwargs):
        if not self.username:
            self.username = self.email
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
