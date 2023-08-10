from django.shortcuts import get_object_or_404
from rest_framework.decorators import action
from rest_framework.permissions import SAFE_METHODS, AllowAny, IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import render
from rest_framework import filters, permissions, status, views, viewsets

from projects.models import Project, Task
from .serializers import ProjectGetSerializer, ProjectPostSerializer


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
