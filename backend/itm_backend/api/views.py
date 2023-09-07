from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from drf_spectacular.utils import extend_schema
from rest_framework import mixins, status, views, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import SAFE_METHODS, AllowAny, IsAuthenticated
from rest_framework.response import Response

from api.permissions import IsOwnerOrReadOnly, IsParticipantOrReadOnly, IsProjectParticipant
from api.serializers import (AddMemberSerializer, CustomUserCreateSerializer, CustomUserSerializer,
                             ProjectGetSerializer, ProjectPostSerializer,
                             SetPasswordSerializer, TaskGetSerializer,
                             TaskPostSerializer, TeamSerializer)
from projects.models import Project, ProjectUser, Task

from .decorators import (project_view_set_schema, project_view_team_schema,
                         task_view_set_schema, user_me_view_patch_schema,
                         user_me_view_request_schema, user_view_set_schema)

User = get_user_model()


@extend_schema(tags=["User - основное"])
@user_view_set_schema
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


@extend_schema(tags=["User - личный пользователь"])
class UserMeView(views.APIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = CustomUserSerializer

    @user_me_view_request_schema
    def get(self, request):
        user = self.request.user
        serializer = CustomUserSerializer(user, many=False)
        return Response(serializer.data)

    @user_me_view_patch_schema
    def patch(self, request, pk=None):
        user = self.request.user
        serializer = CustomUserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@extend_schema(tags=["Projects - создание и редактирование проектов"])
@project_view_set_schema
class ProjectViewSet(viewsets.ModelViewSet):
    """Вьюсет модели Project"""

    queryset = Project.objects.all()
    permission_classes = (IsAuthenticated, IsOwnerOrReadOnly)

    def get_queryset(self):
        user = self.request.user
        return Project.objects.filter(participants=user.id)

    def get_serializer_class(self):
        if self.request.method in SAFE_METHODS:
            return ProjectGetSerializer
        if self.action == "add_member":
            return AddMemberSerializer
        return ProjectPostSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    @project_view_team_schema
    @action(detail=True, methods=["get"], permission_classes=[IsAuthenticated])
    def team(self, request, pk=None):
        """Отображает команду проекта."""
        project = get_object_or_404(Project, pk=pk)
        serializer = TeamSerializer(project, context={"request": request})
        return Response(serializer.data)

    @action(
        detail=True,
        methods=["post"],
        permission_classes=[IsAuthenticated, IsProjectParticipant],
    )
    def add_member(self, request, pk=None):
        """Добавляет участника в команду проекта."""
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        project = get_object_or_404(Project, pk=pk)
        user = get_object_or_404(User, email=request.data["email"])
        serializer = TeamSerializer(data=request.data, context={"request": request, "user": user, "project": project})
        serializer.is_valid(raise_exception=True)
        ProjectUser.objects.create(user_id=user, project_id=project)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


@extend_schema(tags=["Tasks - создание и редактрирование задач"])
@task_view_set_schema
class TaskViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated, IsParticipantOrReadOnly)

    def get_queryset(self):
        task_project_id = self.kwargs.get("projects_id")
        queryset = Task.objects.filter(task_project=task_project_id)
        return queryset

    def get_serializer_class(self):
        if self.request.method in SAFE_METHODS:
            return TaskGetSerializer
        return TaskPostSerializer

    def perform_create(self, serializer):
        project = get_object_or_404(Project, pk=self.kwargs.get("projects_id"))
        serializer.save(creator=self.request.user, task_project=project)
