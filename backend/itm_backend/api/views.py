from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from rest_framework import mixins, status, views, viewsets
from rest_framework.decorators import action, permission_classes
from rest_framework.permissions import SAFE_METHODS, AllowAny, IsAuthenticated
from rest_framework.response import Response

from api.permissions import IsOwnerOrReadOnly, IsParticipantOrReadOnly
from api.serializers import (CustomUserCreateSerializer, CustomUserSerializer,
                             ProjectGetSerializer, ProjectPostSerializer,
                             SetPasswordSerializer, TaskGetSerializer,
                             TaskPostSerializer, TeamSerializer)
from projects.models import Project, Task

User = get_user_model()


class UserViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    queryset = User.objects.all()
    serializer_class = CustomUserCreateSerializer
    permission_classes = (AllowAny,)

    def post(self, request, pk=None):
        serializer = CustomUserCreateSerializer(data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(["post"], detail=False, permission_classes=(IsAuthenticated,))
    def set_password(self, request, *args, **kwargs):
        serializer = SetPasswordSerializer(data=request.data, context={"request": request})
        if serializer.is_valid():
            self.request.user.set_password(serializer.data["new_password"])
            self.request.user.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserMeView(views.APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        user = self.request.user
        serializer = CustomUserSerializer(user, many=False)
        return Response(serializer.data)

    def patch(self, request, pk=None):
        user = self.request.user
        serializer = CustomUserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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

    @action(detail=True, methods=["get"], permission_classes=[IsAuthenticated])
    def team(self, request, pk=None):
        """Отображает команду проекта."""
        project = get_object_or_404(Project, pk=pk)
        serializer = TeamSerializer(project, context={"request": request})
        return Response(serializer.data)


class TaskViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated, IsParticipantOrReadOnly)
    queryset = Task.objects.all()

    def get_serializer_class(self):
        if self.request.method in SAFE_METHODS:
            return TaskGetSerializer
        return TaskPostSerializer

    def perform_create(self, serializer):
        project = get_object_or_404(Project, pk=self.kwargs.get("task_project_id"))
        serializer.save(creator=self.request.user, project=project)
