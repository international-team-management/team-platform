from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from rest_framework import serializers

from .models import TimeTable, TimeZone

User = get_user_model()


OFFSET_RANGE = (-12, 15)


class TimeTableSerializer(serializers.ModelSerializer):
    """
    Сериализатор для модели TimeTable.
    Отображает информацию о графике работы в JSON-представлении.
    """

    class Meta:
        model = TimeTable
        fields = "__all__"


class TimeZoneSerializer(serializers.HyperlinkedModelSerializer):
    """
    Сериализатор модели TimeZone.
    Отображает информацию о часовом поясе в JSON-представлении.
    """

    class Meta:
        model = TimeZone
        fields = ["value", "label", "offset", "abbrev", "altName"]

    def validate_offset(self, value):
        if value not in range(OFFSET_RANGE):
            raise serializers.ValidationError("Смещение от UTC должно лежать в диапазоне -12 - +15 часов.")

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


class CustomUserSerializer(serializers.ModelSerializer):
    """
    Сериализатор для модели User.
    Отображает информацию о пользователе в JSON-представлении,
    включая информацию о связанных графиках работы с помощью TimeTableSerializer.

    Включаем вложенный сериализатор TimeTableSerializer, чтобы
    отобразить информацию о связанных графиках работы для каждого пользователя.
    """

    timetable = TimeTableSerializer(many=True, read_only=True)
    timezone = TimeZoneSerializer()

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
            "timetable",
            "photo",
            "telephone_number",
        ]

    def update(self, user, validated_data):
        if "timezone" in validated_data:
            timezone = validated_data.pop("timezone")
            current_timezone, status = TimeZone.objects.get_or_create(**timezone)
            user.timezone = current_timezone

        return super().update(user, validated_data)
