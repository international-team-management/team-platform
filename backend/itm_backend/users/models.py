from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    """
    Кастомная модель пользователя.
    Регистрация с помощью email.
    """
    email = models.EmailField(
        verbose_name='адрес электронной почты',
        help_text='example@site.mail',
        unique=True
    )
    password = models.CharField(
        max_length=150,
        verbose_name='Пароль'
    )
    first_name = models.CharField(
        verbose_name='Имя',
        help_text='Иван',
        max_length=150,
    )
    last_name = models.CharField(
        verbose_name='Фамилия',
        help_text='Иванов',
        max_length=150
    )
    role = models.CharField(
        verbose_name='Должность',
        help_text='Ваша должность'
        )
    created_at = models.DateTimeField(
        verbose_name='Дата регистрации пользователя',
        auto_now_add=True
    )
    update_at = models.DateTimeField(
        verbose_name='Дата обновления данных пользователя',
        auto_now=True
    )
    is_active = models.BooleanField(
        verbose_name='Активный пользователь',
        default=True
    )
    user_timezone = models.SmallIntegerField(
        verbose_name='Часовой пояс пользователя',
        default=+3
    )
    photo = models.ImageField(
        verbose_name='Аватар пользователя',
        upload_to='media/',
    )
    telephone_number = models.BigIntegerField(
        verbose_name='Номер телефона',
    )
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['email', 'password', 'first_name', 'last_name']

    class Meta:
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'

    def __str__(self):
        return f'{self.first_name} {self.last_name}'
