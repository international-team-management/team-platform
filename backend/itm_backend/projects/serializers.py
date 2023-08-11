from rest_framework import serializers, status
from rest_framework.exceptions import ValidationError
from django.shortcuts import get_object_or_404
from users.models import User

from .models import Task, TaskUser, Tag


class TaskUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = TaskUser
        fields = ("user_id",)


class TaskCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = "__all__"


class TaskUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = "__all__"


class TaskReadSerializer(serializers.ModelSerializer):
    project = serializers.StringRelatedField(read_only=True)
    creator = serializers.StringRelatedField(read_only=True)
    assigned_to = serializers.StringRelatedField(many=True)
    tags = serializers.StringRelatedField(many=True)

    class Meta:
        model = Task
        fields = (
            "id",
            "name",
            "project",
            "creator",
            "priority",
            "assigned_to",
            "tags",
            "status",
            "description",
            "deadline",
        )


class TaskAddSerializer(serializers.ModelSerializer):
    assigned_to = serializers.PrimaryKeyRelatedField(many=True, queryset=User.objects.all())

    def validate_name(self, value):
        user = self.context["request"].user
        if Task.objects.filter(name=value, creator=user).exists():
            raise ValidationError(f"Задача с таким именем у пользователя '{user}' уже существует.")
        return value

    def create(self, validated_data):
        assigned_data = validated_data.pop('assigned_to')
        tags = validated_data.pop('tags')
        task = Task.objects.create(**validated_data)
        task.tags.set(tags)

        for user_id in assigned_data:
            TaskUser.objects.create(task_id=task, user_id=user_id)

        return task

    class Meta:
        model = Task
        fields = ("id", "name", "project", "creator", "priority", "assigned_to", "tags", "status", "description", "deadline")
