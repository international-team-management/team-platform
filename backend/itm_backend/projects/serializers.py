from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from .models import Task, TaskUser


class TaskUserSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField()
    task_id = serializers.IntegerField

    class Meta:
        model = TaskUser
        fields = ('user_id', 'task_id')


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
        fields = ('id', 'name', 'project', 'creator', 'priority', 'assigned_to', 'tags', 'status', 'description', 'deadline')


class TaskAddSerializer(serializers.ModelSerializer):
    def validate_name(self, value):
        user = self.context["request"].user
        if Task.objects.filter(name=value, creator=user).exists():
            raise ValidationError(f"Задача с таким именем у пользователя '{user}' уже существует.")
        return value

    def create(self, validated_data):
        validated_data["creator"] = self.context["request"].user
        return super().create(validated_data)

    class Meta:
        model = Task
        fields = ('name', 'project', 'priority', 'assigned_to', 'tags', 'status', 'description', 'deadline')
