import base64

from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from django.core.files.base import ContentFile
from projects.models import Project, ProjectUser, Task, TaskUser
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from api.services import add_project_example, get_members_num_per_interval
from api.validators import (validate_first_last_names, validate_offset,
                            validate_password)
from projects.models import Project, Task, TaskUser
from users.models import TimeZone

User = get_user_model()


OFFSET_RANGE = (-12, 15)


class Base64ImageField(serializers.ImageField):
    """Сериализация и десериализация изображений в формат base64."""

    def to_internal_value(self, data):
        """Преобразует изображение в формате base64 в объект ContentFile Django."""

        if isinstance(data, str) and data.startswith("data:image"):
            format, imgstr = data.split(";base64,")
            ext = format.split("/")[-1]
            data = ContentFile(base64.b64decode(imgstr), name="temp." + ext)
        return super().to_internal_value(data)


class TimeZoneSerializer(serializers.HyperlinkedModelSerializer):
    """
    Сериализатор модели TimeZone.
    Отображает информацию о часовом поясе в JSON-представлении.
    """

    offset = serializers.IntegerField(validators=[validate_offset])

    class Meta:
        model = TimeZone
        fields = ["value", "label", "offset", "abbrev", "altName"]


class CustomUserCreateSerializer(serializers.ModelSerializer):
    """
    Сериализатор для создания пользователя.
    Отображает информацию о пользователе в JSON-представлении при создании.

    Здесь определены поля, которые будут отображаться при создании пользователя.
    """

    # password = serializers.CharField(validators=[validate_password])
    first_name = serializers.CharField(validators=[validate_first_last_names])
    last_name = serializers.CharField(validators=[validate_first_last_names])

    class Meta:
        model = User
        fields = ["email", "password", "first_name", "last_name"]

    def create(self, validated_data):
        """
        Хэшируем пароль перед сохранением в базу данных.
        """
        validated_data["password"] = make_password(validated_data["password"])
        user = super().create(validated_data)
        add_project_example(user)
        return user

    def to_representation(self, instance):
        """
        Возвращает информацию о пользователе по ТЗ.
        """
        return {
            "id": instance.id,
            "email": instance.email,
            "first_name": instance.first_name,
            "last_name": instance.last_name,
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
    first_name = serializers.CharField(validators=[validate_first_last_names])
    last_name = serializers.CharField(validators=[validate_first_last_names])

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


class TaskGetSerializer(serializers.ModelSerializer):
    creator = CustomUserSerializer(
        read_only=True,
    )
    assigned_to = CustomUserSerializer(
        many=True,
        read_only=True,
    )

    class Meta:
        model = Task
        fields = (
            "id",
            "name",
            "creator",
            "priority",
            "assigned_to",
            "status",
            "description",
            "deadline",
        )


class TaskPostSerializer(serializers.ModelSerializer):
    assigned_to = serializers.PrimaryKeyRelatedField(many=True, queryset=User.objects.all())

    def validate_name(self, value):
        user = self.context["request"].user
        if Task.objects.filter(name=value, creator=user).exists():
            raise ValidationError(f"Задача с таким именем у пользователя '{user}' уже существует.")
        return value

    def create(self, validated_data):
        assigned_data = validated_data.pop("assigned_to")
        task = Task.objects.create(**validated_data)
        for user_id in assigned_data:
            TaskUser.objects.create(task_id=task, user_id=user_id)
        return task

    class Meta:
        model = Task
        fields = (
            "id",
            "name",
            "priority",
            "assigned_to",
            "status",
            "description",
            "deadline",
        )


class ProjectGetSerializer(serializers.ModelSerializer):
    """
    Сериализатор для просмотра модели Проект.
    Отображает информацию о проекте в JSON-представлении.

    """

    owner = CustomUserSerializer(
        read_only=True,
    )
    participants = CustomUserSerializer(
        read_only=True,
        many=True,
    )
    tasks = TaskGetSerializer(
        many=True,
        read_only=True,
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
    )

    def validate_name(self, value):
        user = self.context["request"].user
        if Project.objects.filter(name=value, owner=user).exists():
            raise ValidationError(f"Проект с таким именем у пользователя '{user}' уже существует.")
        return value

    def create(self, validated_data):
        owner = self.context["request"].user
        validated_data["owner"] = owner
        validated_data["participants"] += [owner]
        validated_data.pop("tasks")
        return super().create(validated_data)

    def update(self, instance, validated_data):
        participants = validated_data.get("participants")
        owner = instance.owner
        if owner not in participants:
            participants.append(owner)

        validated_data["participants"] = participants

        for task in validated_data["tasks"]:
            if task.task_project.id != instance.id:
                raise ValidationError(
                    f"Задача '{task}' с id = {task.id} принадлежит другому " f"проекту и не может быть добавлена."
                )
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
            "created_at",
            "updated_at",
        ]


class TeamSerializer(serializers.ModelSerializer):
    """Сериализатор для отображения команды проекта."""

    total_members = serializers.SerializerMethodField()
    members = CustomUserSerializer(source="participants", read_only=True, many=True)
    members_per_interval = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = ["total_members", "members", "members_per_interval"]

    def get_total_members(self, project):
        """Возвращает количество участников команды."""
        return project.participants.count()

    def get_members_per_interval(self, project):
        """
        Возвращает список словарей с часовыми интервалами, и количеством
        доступных участников проекта в каждый интервал времени.
        """
        user = self.context["request"].user
        return get_members_num_per_interval(user, project)

    def validate(self, data):
        """Валидация добавления участника проекта."""
        if self.context["request"].method == "POST":
            user = self.context["user"]
            project = self.context["project"]
            if ProjectUser.objects.filter(user_id=user, project_id=project).exists():
                raise ValidationError("Участник с таким email уже состоит в команде проекта.")
            if not user.is_active:
                raise ValidationError("Пользователь с таким email больше не активен.")
            return project


class SetPasswordSerializer(serializers.Serializer):
    new_password = serializers.CharField(validators=[validate_password])
    current_password = serializers.CharField()

    class Meta:
        model = User
        fields = ["new_password", "current_password"]

    def create(self, validated_data):
        """
        Хэшируем пароль перед сохранением в базу данных.
        """
        validated_data["new_password"] = make_password(validated_data["new_password"])
        return super().create(validated_data)

    def validate_current_password(self, value):
        user = self.context["request"].user
        is_password_valid = user.check_password(value)

        if not is_password_valid:
            raise ValidationError(f"Введен неверный пароль пользователя '{user}'.")
        return value


class UnauthorizedErrorSerializer(serializers.Serializer):
    detail = serializers.CharField(
        default="Authentication credentials were not provided.",
        help_text="Сообщение об ошибке",
    )


class NotFoundErrorSerializer(serializers.Serializer):
    detail = serializers.CharField(
        default="Not found.",
        help_text="Сообщение об ошибке",
    )


class InternalServerErrorSerializer(serializers.Serializer):
    detail = serializers.CharField(
        default="Internal server error.",
        help_text="Сообщение об ошибке",
    )


class BadRequestUserErrorSerializer(serializers.Serializer):
    detail = serializers.CharField(
        default="Длина пароля должна быть от 8 до 22 символов.",
        help_text="Сообщение об ошибке",
    )


class BadRequestProjectTaskErrorSerializer(serializers.Serializer):
    detail = serializers.CharField(
        default="This field may not be blank.",
        help_text="Сообщение об ошибке",
    )


class BadRequestTimezoneErrorSerializer(serializers.Serializer):
    detail = serializers.CharField(
        default="У вас не задана временная зона.",
        help_text="Сообщение об ошибке",
    )


class AddMemberSerializer(serializers.Serializer):
    """Сериализатор добавления пользователя в команду проекта."""

    email = serializers.EmailField()

    class Meta:
        model = User
        fields = ["email"]
        read_only_fields = ["email"]

    def validate_email(self, value):
        if not User.objects.filter(email=value).exists():
            raise ValidationError("Пользователь с таким email не найден.")
        return value
