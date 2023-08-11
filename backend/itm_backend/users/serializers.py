import base64

from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from django.core.files.base import ContentFile
from rest_framework import serializers

from .models import TimeZone

User = get_user_model()


OFFSET_RANGE = (-12, 15)


class Base64ImageField(serializers.ImageField):
    """Сериализация и десериализация изображений в формат base64."""

    def to_internal_value(self, data):
        """Преобразует изображение в формате base64 в объект ContentFile Django."""

        if isinstance(data, str) and data.startswith('data:image'):
            format, imgstr = data.split(';base64,')
            ext = format.split('/')[-1]

            data = ContentFile(base64.b64decode(imgstr), name='temp.' + ext)

        return super().to_internal_value(data)


class TimeZoneSerializer(serializers.HyperlinkedModelSerializer):
    """
    Сериализатор модели TimeZone.
    Отображает информацию о часовом поясе в JSON-представлении.
    """

    class Meta:
        model = TimeZone
        fields = ["value", "label", "offset", "abbrev", "altName"]

    def validate_offset(self, value):
        if value not in range(*OFFSET_RANGE):
            raise serializers.ValidationError("Смещение от UTC должно лежать в диапазоне от -12 до +15 часов.")

        return value


class CustomUserCreateSerializer(serializers.ModelSerializer):
    """
    Сериализатор для создания пользователя.
    Отображает информацию о пользователе в JSON-представлении при создании.

    Здесь определены поля, которые будут отображаться при создании пользователя.
    """

    class Meta:
        model = User
        fields = ["email", "password", "first_name", "last_name"]

    def create(self, validated_data):
        """
        Хэшируем пароль перед сохранением в базу данных.
        """
        validated_data["password"] = make_password(validated_data["password"])
        return super().create(validated_data)

    def to_representation(self, instance):
        """
        Возвращает информацию о пользователе по ТЗ.
        """
        return {
            "id": instance.id,
            "email": instance.email,
            "first_name": instance.first_name,
            "last_name": instance.last_name
        }


class CustomUserSerializer(serializers.ModelSerializer):
    """
    Сериализатор для модели User.
    Отображает информацию о пользователе в JSON-представлении,
    включая информацию о связанных графиках работы с помощью TimeTableSerializer.

    Включаем вложенный сериализатор TimeTableSerializer, чтобы
    отобразить информацию о связанных графиках работы для каждого пользователя.
    """

    timezone = TimeZoneSerializer()
    photo = Base64ImageField()

    class Meta:
        """
        Здесь определены поля, которые будут отображаться в JSON-представлении пользователя.
        """

        model = User

        fields = [
            "id",
            "username",
            "email",
            "first_name",
            "last_name",
            "role",
            "created_at",
            "update_at",
            "is_active",
            "timezone",
            "work_start",
            "work_finish",
            "photo",
            "telephone_number",
        ]

    def update(self, user, validated_data):
        if "timezone" in validated_data:
            timezone = validated_data.pop("timezone")
            current_timezone, status = TimeZone.objects.get_or_create(**timezone)
            user.timezone = current_timezone

        return super().update(user, validated_data)
