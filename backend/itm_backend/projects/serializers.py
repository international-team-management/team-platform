from rest_framework import serializers

from .models import Task, TaskUser


class TaskUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskUser
        fields = "__all__"


class TaskCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = "__all__"


class TaskUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = "__all__"


class TaskReadSerializer(serializers.ModelSerializer):
    users = TaskUserSerializer(many=True)

    class Meta:
        model = Task
        fields = "__all__"
