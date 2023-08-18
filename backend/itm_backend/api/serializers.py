import base64
import datetime

from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from django.core.files.base import ContentFile
from django.db.models import F
from projects.models import Project, Task, TaskUser
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from users.models import TimeZone

from .validators import validate_first_last_names, validate_offset, validate_password

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

    password = serializers.CharField(validators=[validate_password])
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
        return super().create(validated_data)

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
        return super().create(validated_data)

    def update(self, instance, validated_data):
        participants = validated_data.get("participants")
        owner = instance.owner
        if owner not in participants:
            participants.append(owner)

        validated_data["participants"] = participants

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

    def get_total_members(self, obj):
        """Возвращает количество участников команды."""
        return obj.participants.count()

    def get_members_per_interval(self, obj):
        """
        Возвращает список словарей с часовыми интервалами, и количеством
        доступных участников проекта в каждый интервал времени.
        """
        user = self.context["request"].user
        if user.timezone:
            user_offset = user.timezone.offset
        else:
            raise ValidationError("У вас не задана временная зона.")
        print(user.first_name)
        print(user_offset)
        user_work_start = user.work_start
        user_work_finish = user.work_finish
        print(f"user_work_start: {user_work_start}, user_work_finish: {user_work_finish}")

        new_hour = (user_work_start.hour - user_offset) % 24
        # получение queryset объектов участников, содержащих время начала и окончания работы, и offset от UTC
        participants_times = (
            obj.participants.all()
            .filter(work_start__isnull=False, work_finish__isnull=False, timezone__offset__isnull=False)
            .values("first_name", "work_start", "work_finish", offset=F("timezone__offset"))
        )
        print(participants_times)
        working_times_to_user_relation = []  # список рабочего времени для каждого участника
        # по отношению к времени пользователя:
        for participant_times in participants_times:
            # вычисляем время начала и конца работы участника в таймзоне пользователя, который делает запрос
            participant_offset = participant_times.get("offset")
            work_start = participant_times.get("work_start")
            # т.к. offset и work_start в разных форматах, для вычисления времени преобразуем часовую
            # составляющую work_start в целое число. После вычисления - корректируем часовую составляющую work_finish
            new_hour = (work_start.hour - participant_offset + user_offset) % 24
            work_start = work_start.replace(hour=new_hour)
            work_finish = participant_times.get("work_finish")
            new_hour = (work_finish.hour - participant_offset + user_offset) % 24
            work_finish = work_finish.replace(hour=new_hour)
            working_times_to_user_relation.append([work_start, work_finish])
            print(participant_times.get("first_name"), work_start, work_finish)
        print(working_times_to_user_relation)
        result = []
        time_intervals = [f"{hour:02d}:00 - {(hour + 1) % 24:02d}:00" for hour in range(24)]  # генерирует список
        # часовых интервалов в виде ["00:00 - 01:00", ..., "23:00 - 00:00"]
        for interval in time_intervals:
            interval_start = interval.split(" - ")[0]
            interval_finish = interval_start[:2] + ":59"
            interval_start = datetime.datetime.strptime(interval_start, "%H:%M").time()
            interval_finish = datetime.datetime.strptime(interval_finish, "%H:%M").time()
            print(interval_start, interval_finish)
            counter = 0
            for working_time in working_times_to_user_relation:
                work_start, work_finish = working_time[0], working_time[1]
                if work_start < work_finish:  # если рабочий интервал не пересекает полночь
                    if work_start <= interval_start and work_finish >= interval_finish:
                        counter += 1
                else:  # если рабочий интервал пересекает полночь
                    if work_finish >= interval_finish or work_start <= interval_start:
                        counter += 1
            result.append({interval: counter})
        return result
