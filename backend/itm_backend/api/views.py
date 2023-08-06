from django.shortcuts import render
from rest_framework import filters, permissions, status, views, viewsets

from projects.models import Project, Task
from .serializers import ProjectGetSerializer

class ProjectViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.AllowAny,)
    queryset = Project.objects.all()
    serializer_class = ProjectGetSerializer
    
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)