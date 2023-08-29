from django.shortcuts import get_object_or_404
from drf_spectacular.utils import OpenApiResponse, extend_schema, extend_schema_view
from projects.models import Project, Task
from rest_framework import mixins, status, views, viewsets
from rest_framework.decorators import action, permission_classes
from rest_framework.permissions import SAFE_METHODS, AllowAny, IsAuthenticated
from rest_framework.response import Response
from users.models import User

from .permissions import IsOwnerOrReadOnly, IsParticipantOrReadOnly
from .serializers import (
    BadRequestUserErrorSerializer,
    CustomUserCreateSerializer,
    CustomUserSerializer,
    InternalServerErrorSerializer,
    ProjectGetSerializer,
    ProjectPostSerializer,
    SetPasswordSerializer,
    TaskGetSerializer,
    TaskPostSerializer,
    TeamSerializer,
    UnauthorizedErrorSerializer,
)


@extend_schema(tags=["User Edit"])
@extend_schema_view(
    create=extend_schema(
        request=CustomUserCreateSerializer,
        summary="Позволяет создать нового пользователя",
        description="Этот метод позволяет создать нового пользователя.",
        responses={
            201: OpenApiResponse(
                response=CustomUserCreateSerializer,
                description="OK",
            ),
            400: OpenApiResponse(
                response=BadRequestUserErrorSerializer,
                description="Error: Bad Request",
            ),
            401: OpenApiResponse(
                response=UnauthorizedErrorSerializer,
                description="Error: Unauthorized",
            ),
            500: OpenApiResponse(
                response=InternalServerErrorSerializer,
                description="Error: Internal server error",
            ),
        },
    ),
    set_password=extend_schema(
        request=SetPasswordSerializer,
        summary="Изменение пароля своего пользователя",
        description="Этот метод позволяет измений пароль своего пользователя.",
        responses={
            204: OpenApiResponse(
                response=SetPasswordSerializer,
                description="OK",
            ),
            400: OpenApiResponse(
                response=BadRequestUserErrorSerializer,
                description="Error: Bad Request",
            ),
            401: OpenApiResponse(
                response=UnauthorizedErrorSerializer,
                description="Error: Unauthorized",
            ),
            500: OpenApiResponse(
                response=InternalServerErrorSerializer,
                description="Error: Internal server error",
            ),
        },
    ),
)
class UserViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    """
    Вьюсет для пользователей.
    """

    queryset = User.objects.all()
    serializer_class = CustomUserCreateSerializer

    @permission_classes((AllowAny,))
    def post(self, request, pk=None):
        user = self.request.user
        serializer = CustomUserCreateSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(["post"], detail=False, permission_classes=(IsAuthenticated,))
    def set_password(self, request, *args, **kwargs):
        serializer = SetPasswordSerializer(data=request.data)
        if serializer.is_valid():
            self.request.user.set_password(serializer.data["new_password"])
            self.request.user.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@extend_schema(tags=["User info"])
class UserMeView(views.APIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = CustomUserSerializer

    @extend_schema(
        request=CustomUserSerializer,
        summary="Получить информацию о своём пользователе",
        description="Этот метод позволяет получить информацию о своём пользователе.",
        responses={
            200: OpenApiResponse(
                response=CustomUserSerializer,
                description="OK",
            ),
            401: OpenApiResponse(
                response=UnauthorizedErrorSerializer,
                description="Unauthorized Error",
            ),
            500: OpenApiResponse(
                response=InternalServerErrorSerializer,
                description="Internal server error.",
            ),
        },
    )
    def get(self, request):
        user = self.request.user
        serializer = CustomUserSerializer(user, many=False)
        return Response(serializer.data)

    @extend_schema(
        summary="Частичное изменение своего пользователя",
        description="Этот метод позволяет частично изменить своего пользователя.",
        responses={
            200: OpenApiResponse(
                response=CustomUserSerializer,
                description="OK",
            ),
            (200, "application/json"): {
                "description": "Success",
                "type": "object",
                "properties": {
                    "access_token": {"type": "string", "minLength": 1},
                    "refresh_token": {"type": "string", "minLength": 1},
                },
                "required": ["access_token", "refresh_token"],
            },
            401: OpenApiResponse(
                response=UnauthorizedErrorSerializer,
                description="Unauthorized Error",
            ),
            500: OpenApiResponse(
                response=InternalServerErrorSerializer,
                description="Internal server error.",
            ),
        },
    )
    def patch(self, request, pk=None):
        user = self.request.user
        serializer = CustomUserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@extend_schema(tags=["Project"])
@extend_schema_view(
    list=extend_schema(
        summary="Получить список проектов",
        description="Этот метод позволяет получить список проектов.",
        responses={
            201: OpenApiResponse(
                response=ProjectGetSerializer,
                description="OK",
            ),
            401: OpenApiResponse(
                response=UnauthorizedErrorSerializer,
                description="Unauthorized Error",
            ),
            500: OpenApiResponse(
                response=InternalServerErrorSerializer,
                description="Internal server error.",
            ),
        },
    ),
    update=extend_schema(
        summary="Изменение существующего проекта",
        description="Этот метод позволяет изменить существующий проект.",
        responses={
            (200, "application/json"): {
                "description": "Success",
                "type": "object",
                "properties": {
                    "access_token": {"type": "string", "minLength": 1},
                    "refresh_token": {"type": "string", "minLength": 1},
                },
                "required": ["access_token", "refresh_token"],
            },
        },
    ),
    create=extend_schema(
        summary="Создание нового проекта", description="Этот метод позволяет создать новую задачу в проекте."
    ),
    retrieve=extend_schema(
        summary="Получить детали проекта", description="Этот метод позволяет получить детали задачи в проекте."
    ),
    partial_update=extend_schema(
        summary="Частичное изменение проекта", description="Этот метод позволяет частично изменить задачу в проекте."
    ),
    destroy=extend_schema(summary="Удаление проекта", description="Этот метод позволяет удалить задачу из проекта."),
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
        description="Этот метод позволяет получить список команд для проекта.",
        responses={
            401: OpenApiResponse(
                response=UnauthorizedErrorSerializer,
                description="Не авторизовано",
            ),
        },
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
        description="Этот метод позволяет изменить существующую задачу в проекте.",
    ),
    create=extend_schema(
        summary="Создание новой задачи", description="Этот метод позволяет создать новую задачу в проекте."
    ),
    retrieve=extend_schema(
        summary="Получить детали задачи в проекте", description="Этот метод позволяет получить детали задачи в проекте."
    ),
    partial_update=extend_schema(
        summary="Частичное изменение задачи в проекте",
        description="Этот метод позволяет частично изменить задачу в проекте.",
    ),
    destroy=extend_schema(
        summary="Удаление задачи из проекта", description="Этот метод позволяет удалить задачу из проекта."
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
