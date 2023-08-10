from django.shortcuts import get_object_or_404
from rest_framework.decorators import action
from rest_framework.permissions import SAFE_METHODS, AllowAny, IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import render
from rest_framework import filters, permissions, status, views, viewsets

from projects.models import Project, Task
from .serializers import ProjectGetSerializer, ProjectPostSerializer


class ProjectViewSet(viewsets.ModelViewSet):
    """Вьюсет модели Project: [GET, POST, DELETE, PATCH]."""

    queryset = Project.objects.all()

    def get_serializer_class(self):
        if self.request.method in SAFE_METHODS:
            return ProjectGetSerializer
        return ProjectPostSerializer

    @action(detail=False,
            methods=["post", "delete", "patch"],
            permission_classes=[IsAuthenticated])
    def crud_project(self, request, pk=None):
        project = self.get_object()
        user = request.user

        if request.method == "POST":
            if Project.objects.filter(name=request.data["name"]).exists():
                return Response(
                    {"errors": "Проект с таким именем уже существует!"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            serializer = ProjectPostSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(owner=request.user)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        elif request.method == "DELETE":
            project.delete()
            return Response({"errors": "Проект с таким именем уже существует!"}, status=status.HTTP_204_NO_CONTENT)

        elif request.method == "PATCH":
            serializer = ProjectPostSerializer(project, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        else:
            serializer = ProjectGetSerializer(project)
            return Response(serializer.data)
