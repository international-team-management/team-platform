from projects.models import Project
from rest_framework import viewsets
from rest_framework.permissions import SAFE_METHODS, IsAuthenticated

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
