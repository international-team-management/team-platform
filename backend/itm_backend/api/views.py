from django.shortcuts import get_object_or_404
from projects.models import Project, Task
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import SAFE_METHODS, IsAuthenticated
from rest_framework.response import Response

from .serializers import (
    ProjectGetSerializer,
    ProjectPostSerializer,
    TaskGetSerializer,
    TaskPostSerializer,
    TeamSerializer,
)


class ProjectViewSet(viewsets.ModelViewSet):
    """Вьюсет модели Project"""

    queryset = Project.objects.all()
    permission_classes = (IsAuthenticated,)

    def get_serializer_class(self):
        if self.request.method in SAFE_METHODS:
            return ProjectGetSerializer
        return ProjectPostSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    @action(detail=True, methods=["get"], permission_classes=[IsAuthenticated])
    def team(self, request, pk=None):
        """Отображает команду проекта."""
        project = get_object_or_404(Project, pk=pk)
        serializer = TeamSerializer(project, context={"request": request})
        return Response(serializer.data)


class TaskViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = Task.objects.all()

    def get_serializer_class(self):
        if self.request.method in SAFE_METHODS:
            return TaskGetSerializer
        return TaskPostSerializer

    def perform_create(self, serializer):
        project = get_object_or_404(Project, pk=self.kwargs.get("task_project_id"))
        serializer.save(creator=self.request.user, project=project)
