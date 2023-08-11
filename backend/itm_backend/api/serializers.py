from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from users.models import TimeZone
from projects.models import Project, Task, Tag

User = get_user_model()


OFFSET_RANGE = (-12, 15)


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
            raise serializers.ValidationError(
                "Смещение от UTC должно лежать в диапазоне от -12 до +15 часов."
            )

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


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = [
            "id",
            "name",
        ]


class ProjectGetSerializer(serializers.ModelSerializer):
    """
    Сериализатор для просмотра модели Проект.
    Отображает информацию о проекте в JSON-представлении.

    """

    owner = CustomUserSerializer(
        read_only=True,
    )

    participants = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(),
        many=True,
    )
    tasks = serializers.PrimaryKeyRelatedField(
        queryset=Task.objects.all(),
        many=True,
        required=True,
    )
    tags = TagSerializer(
        read_only=True,
        many=True,
    )

    class Meta:
        model = Project
        fields = [
            "id",
            "name",
            "description",
            "owner",
            "participants",
            "tasks",
            "start",
            "deadline",
            "status",
            "priority",
            "tags",
            "created_at",
            "updated_at",
        ]


class ProjectPostSerializer(serializers.ModelSerializer):
    """
    Сериализатор для создания и редактирования модели Проект.
    Отображает информацию о проекте в JSON-представлении.

    """

    participants = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(),
        many=True,
    )
    tasks = serializers.PrimaryKeyRelatedField(
        queryset=Task.objects.all(),
        many=True,
        required=True,
    )
    tags = serializers.PrimaryKeyRelatedField(
        queryset=Tag.objects.all(),
        many=True,
    )

    def validate_name(self, value):
        user = self.context["request"].user
        if Project.objects.filter(name=value, owner=user).exists():
            raise ValidationError(f"Проект с таким именем у пользователя '{user}' уже существует.")

        return value
        
    def create(self, validated_data):
        validated_data["owner"] = self.context["request"].user
        return super().create(validated_data)
    
    def update(self, instance, validated_data):
        return super().update(instance, validated_data)

    class Meta:
        model = Project
        fields = [
            "name",
            "description",
            "participants",
            "tasks",
            "start",
            "deadline",
            "status",
            "priority",
            "tags",
            "created_at",
            "updated_at",
        ]
