# Generated by Django 3.2.20 on 2023-08-05 20:30

import django.db.models.deletion
import django.utils.timezone
import phonenumber_field.modelfields
import users.models
from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        ("auth", "0012_alter_user_first_name_max_length"),
    ]

    operations = [
        migrations.CreateModel(
            name="TimeZone",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("value", models.CharField(max_length=150, verbose_name="Наименование")),
                ("label", models.CharField(blank=True, max_length=250, verbose_name="Значение")),
                ("offset", models.SmallIntegerField(verbose_name="Смещение от UTC")),
                ("abbrev", models.CharField(blank=True, max_length=50, verbose_name="Аббревиатура")),
                ("altName", models.CharField(blank=True, max_length=150, verbose_name="Условное наименование")),
            ],
            options={
                "verbose_name": "Часовой пояс",
                "verbose_name_plural": "Часовые пояса",
            },
        ),
        migrations.CreateModel(
            name="User",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("last_login", models.DateTimeField(blank=True, null=True, verbose_name="last login")),
                (
                    "is_superuser",
                    models.BooleanField(
                        default=False,
                        help_text="Designates that this user has all permissions without explicitly assigning them.",
                        verbose_name="superuser status",
                    ),
                ),
                (
                    "is_staff",
                    models.BooleanField(
                        default=False,
                        help_text="Designates whether the user can log into this admin site.",
                        verbose_name="staff status",
                    ),
                ),
                ("date_joined", models.DateTimeField(default=django.utils.timezone.now, verbose_name="date joined")),
                ("username", models.CharField(blank=True, max_length=150, verbose_name="Логин")),
                (
                    "email",
                    models.EmailField(
                        help_text="example@site.mail",
                        max_length=254,
                        unique=True,
                        verbose_name="адрес электронной почты",
                    ),
                ),
                ("password", models.CharField(max_length=150, verbose_name="Пароль")),
                ("first_name", models.CharField(help_text="Иван", max_length=150, verbose_name="Имя")),
                ("last_name", models.CharField(blank=True, help_text="Иванов", max_length=150, verbose_name="Фамилия")),
                ("role", models.CharField(help_text="Ваша должность", max_length=50, verbose_name="Должность")),
                ("created_at", models.DateTimeField(auto_now_add=True, verbose_name="Дата регистрации пользователя")),
                ("update_at", models.DateTimeField(auto_now=True, verbose_name="Дата обновления данных пользователя")),
                (
                    "is_active",
                    models.BooleanField(blank=True, default=True, null=True, verbose_name="Активный пользователь"),
                ),
                ("work_start", models.TimeField(null=True, verbose_name="Время начала работы")),
                ("work_finish", models.TimeField(null=True, verbose_name="Время окончания работы")),
                (
                    "photo",
                    models.ImageField(blank=True, null=True, upload_to="media/", verbose_name="Аватар пользователя"),
                ),
                (
                    "telephone_number",
                    phonenumber_field.modelfields.PhoneNumberField(
                        blank=True, max_length=128, null=True, region=None, verbose_name="Номер телефона"
                    ),
                ),
                (
                    "groups",
                    models.ManyToManyField(
                        blank=True,
                        help_text="The groups this user belongs to. A user will get all permissions granted to each of their groups.",
                        related_name="user_set",
                        related_query_name="user",
                        to="auth.Group",
                        verbose_name="groups",
                    ),
                ),
                (
                    "timezone",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="users",
                        to="users.timezone",
                        verbose_name="Часовой пояс пользователя",
                    ),
                ),
                (
                    "user_permissions",
                    models.ManyToManyField(
                        blank=True,
                        help_text="Specific permissions for this user.",
                        related_name="user_set",
                        related_query_name="user",
                        to="auth.Permission",
                        verbose_name="user permissions",
                    ),
                ),
            ],
            options={
                "verbose_name": "Пользователь",
                "verbose_name_plural": "Пользователи",
            },
            managers=[
                ("objects", users.models.CustomUserManager()),
            ],
        ),
    ]
