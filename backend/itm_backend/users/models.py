from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import UserManager as DefaultUserManager
from django.db import models


class TimeTable(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="timetables")
    work_start = models.TimeField(verbose_name="Время начала работы")
    work_finish = models.TimeField(verbose_name="Время окончания работы")

    class Meta:
        ordering = ["id"]
        verbose_name = "График работы"
        verbose_name_plural = "График работы"

    def __str__(self):
        return f"{self.work_start} - {self.work_finish}"


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
    password = models.CharField(max_length=150, verbose_name="Пароль")
    first_name = models.CharField(
        verbose_name="Имя",
        help_text="Иван",
        max_length=150,
    )
    last_name = models.CharField(
        verbose_name="Фамилия",
        help_text="Иванов",
        max_length=150,
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
    user_timezone = models.CharField(
        verbose_name="Часовой пояс пользователя",
        max_length=150,
        blank=True,
    )
    timetable = models.ManyToManyField(
        TimeTable,
        verbose_name="График работы",
        related_name="user_set",
        blank=True,
    )
    photo = models.ImageField(verbose_name="Аватар пользователя", upload_to="media/", blank=True, null=True)
    telephone_number = models.CharField(verbose_name="Номер телефона", blank=True, null=True, max_length=15)
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
