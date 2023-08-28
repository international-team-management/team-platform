from django.shortcuts import get_object_or_404
from drf_spectacular.utils import extend_schema_view, extend_schema
from projects.models import Project, Task
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import SAFE_METHODS, IsAuthenticated
from rest_framework.response import Response

from .permissions import IsOwnerOrReadOnly, IsParticipantOrReadOnly
from .serializers import (
    ProjectGetSerializer,
    ProjectPostSerializer,
    TaskGetSerializer,
    TaskPostSerializer,
    TeamSerializer,
)


@extend_schema(
    tags=["Project"]
)
@extend_schema_view(
    list=extend_schema(
        summary="Получить список проектов",
        description="Этот метод позволяет получить список задач в проекте.",
    ),
    update=extend_schema(
        summary="Изменение существующего проекта",
        description="Этот метод позволяет изменить существующую задачу в проекте."
    ),
    create=extend_schema(
        summary="Создание нового проекта",
        description="Этот метод позволяет создать новую задачу в проекте."
    ),
    retrieve=extend_schema(
        summary="Получить детали проекта",
        description="Этот метод позволяет получить детали задачи в проекте."
    ),
    partial_update=extend_schema(
        summary="Частичное изменение проекта",
        description="Этот метод позволяет частично изменить задачу в проекте."
    ),
    destroy=extend_schema(
        summary="Удаление проекта",
        description="Этот метод позволяет удалить задачу из проекта."
    ),
)
class ProjectViewSet(viewsets.ModelViewSet):
    """Вьюсет модели Project"""

    queryset = Project.objects.all()
    permission_classes = (IsAuthenticated, IsOwnerOrReadOnly)

    def get_serializer_class(self):
        if self.request.method in SAFE_METHODS:
            return ProjectGetSerializer
        return ProjectPostSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    @extend_schema(
        tags=["Project Teams"],
        summary="Получить список команд",
        description="Этот метод позволяет получить список команд для проекта."
    )
    @action(detail=True, methods=["get"], permission_classes=[IsAuthenticated])
    def team(self, request, pk=None):
        project = get_object_or_404(Project, pk=pk)
        serializer = TeamSerializer(project, context={"request": request})
        return Response(serializer.data)


@extend_schema(tags=["Tasks"])
@extend_schema_view(
    list=extend_schema(
        summary="Получить список задач",
        description="Этот метод позволяет получить список задач в проекте.",
    ),
    update=extend_schema(
        summary="Изменение существующей задачи",
        description="Этот метод позволяет изменить существующую задачу в проекте."
    ),
    create=extend_schema(
        summary="Создание новой задачи",
        description="Этот метод позволяет создать новую задачу в проекте."
    ),
    retrieve=extend_schema(
        summary="Получить детали задачи в проекте",
        description="Этот метод позволяет получить детали задачи в проекте."
    ),
    partial_update=extend_schema(
        summary="Частичное изменение задачи в проекте",
        description="Этот метод позволяет частично изменить задачу в проекте."
    ),
    destroy=extend_schema(
        summary="Удаление задачи из проекта",
        description="Этот метод позволяет удалить задачу из проекта."
    ),
)
class TaskViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated, IsParticipantOrReadOnly)
    queryset = Task.objects.all()

    def get_serializer_class(self):
        if self.request.method in SAFE_METHODS:
            return TaskGetSerializer
        return TaskPostSerializer

    def perform_create(self, serializer):
        project = get_object_or_404(Project, pk=self.kwargs["projects_id"])
        serializer.save(creator=self.request.user, task_project_id=project.id)
