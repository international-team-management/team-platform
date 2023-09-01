from drf_spectacular.utils import (
    OpenApiParameter,
    OpenApiResponse,
    extend_schema,
    extend_schema_view,
)

from .serializers import (
    BadRequestProjectTaskErrorSerializer,
    BadRequestTimezoneErrorSerializer,
    BadRequestUserErrorSerializer,
    CustomUserCreateSerializer,
    CustomUserSerializer,
    InternalServerErrorSerializer,
    NotFoundErrorSerializer,
    ProjectGetSerializer,
    ProjectPostSerializer,
    SetPasswordSerializer,
    TaskGetSerializer,
    TaskPostSerializer,
    UnauthorizedErrorSerializer,
)

user_view_set_schema = extend_schema_view(
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


user_me_view_request_schema = extend_schema(
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
            description="Error: Unauthorized",
        ),
        500: OpenApiResponse(
            response=InternalServerErrorSerializer,
            description="Error: Internal server error",
        ),
    },
)


user_me_view_patch_schema = extend_schema(
    summary="Частичное изменение своего пользователя",
    description="Этот метод позволяет частично изменить своего пользователя.",
    responses={
        200: OpenApiResponse(
            response=CustomUserSerializer,
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
)


project_view_set_schema = extend_schema_view(
    list=extend_schema(
        request=ProjectGetSerializer(many=True),
        summary="Получить список проектов",
        description="Этот метод позволяет получить список проектов.",
        responses={
            200: OpenApiResponse(
                response=ProjectGetSerializer(many=True),
                description="OK",
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
    create=extend_schema(
        request=ProjectPostSerializer,
        summary="Создание нового проекта",
        description="Этот метод позволяет создать новый проект.",
        responses={
            201: OpenApiResponse(
                response=ProjectPostSerializer,
                description="OK",
            ),
            400: OpenApiResponse(
                response=BadRequestProjectTaskErrorSerializer,
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
    retrieve=extend_schema(
        request=ProjectGetSerializer,
        summary="Получить информацию о проекте",
        description="Этот метод позволяет получить информацию о проекте.",
        parameters=[OpenApiParameter("id", int, OpenApiParameter.PATH, description="Введите уникальный ID проекта:")],
        responses={
            200: OpenApiResponse(
                response=ProjectGetSerializer,
                description="OK",
            ),
            401: OpenApiResponse(
                response=UnauthorizedErrorSerializer,
                description="Error: Unauthorized",
            ),
            404: OpenApiResponse(
                response=NotFoundErrorSerializer,
                description="Error: Not Found",
            ),
            500: OpenApiResponse(
                response=InternalServerErrorSerializer,
                description="Error: Internal server error",
            ),
        },
    ),
    update=extend_schema(
        request=ProjectPostSerializer,
        summary="Изменение существующего проекта",
        description="Этот метод позволяет изменить существующий проект.",
        parameters=[OpenApiParameter("id", int, OpenApiParameter.PATH, description="Введите уникальный ID проекта:")],
        responses={
            200: OpenApiResponse(
                response=ProjectPostSerializer,
                description="OK",
            ),
            400: OpenApiResponse(
                response=BadRequestProjectTaskErrorSerializer,
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
    partial_update=extend_schema(
        request=ProjectPostSerializer,
        summary="Частичное изменение проекта",
        description="Этот метод позволяет частично изменить задачу в проекте.",
        parameters=[OpenApiParameter("id", int, OpenApiParameter.PATH, description="Введите уникальный ID проекта:")],
        responses={
            200: OpenApiResponse(
                response=ProjectPostSerializer,
                description="OK",
            ),
            400: OpenApiResponse(
                response=BadRequestProjectTaskErrorSerializer,
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
    destroy=extend_schema(
        summary="Удаление проекта",
        description="Этот метод позволяет удалить проект.",
        parameters=[OpenApiParameter("id", int, OpenApiParameter.PATH, description="Введите уникальный ID проекта:")],
        responses={
            204: OpenApiResponse(
                description="OK",
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


project_view_team_schema = extend_schema(
    tags=["Projects - разное"],
    summary="Получить список команд",
    description="Этот метод позволяет получить список команд для проекта.",
    parameters=[OpenApiParameter("id", int, OpenApiParameter.PATH, description="Введите уникальный ID проекта:")],
    responses={
        200: OpenApiResponse(
            response=ProjectGetSerializer,
            description="OK",
        ),
        400: OpenApiResponse(
            response=BadRequestTimezoneErrorSerializer,
            description="Error: Bad Request",
        ),
        401: OpenApiResponse(
            response=UnauthorizedErrorSerializer,
            description="Error: Unauthorized",
        ),
        404: OpenApiResponse(
            response=NotFoundErrorSerializer,
            description="Error: Not Found",
        ),
        500: OpenApiResponse(
            response=InternalServerErrorSerializer,
            description="Error: Internal server error",
        ),
    },
)


project_view_project_example = extend_schema(
    tags=["Projects - разное"],
    summary="Тестовый проект",
    description="Тестовый проект.",
    responses={
        200: OpenApiResponse(
            response=ProjectGetSerializer,
            description="OK",
        ),
        # 400: OpenApiResponse(
        #     response=BadRequestTimezoneErrorSerializer,
        #     description="Error: Bad Request",
        # ),
        # 401: OpenApiResponse(
        #     response=UnauthorizedErrorSerializer,
        #     description="Error: Unauthorized",
        # ),
        # 404: OpenApiResponse(
        #     response=NotFoundErrorSerializer,
        #     description="Error: Not Found",
        # ),
        # 500: OpenApiResponse(
        #     response=InternalServerErrorSerializer,
        #     description="Error: Internal server error",
        # ),
    },
)


task_view_set_schema = extend_schema_view(
    list=extend_schema(
        summary="Получить список задач для проекта",
        description="Этот метод позволяет получить список задач в определённом проекте.",
        parameters=[
            OpenApiParameter("projects_id", int, OpenApiParameter.PATH, description="Введите уникальный ID проекта:")
        ],
        responses={
            200: OpenApiResponse(
                response=TaskGetSerializer,
                description="OK",
            ),
            401: OpenApiResponse(
                response=UnauthorizedErrorSerializer,
                description="Error: Unauthorized",
            ),
            404: OpenApiResponse(
                response=NotFoundErrorSerializer,
                description="Error: Not Found",
            ),
            500: OpenApiResponse(
                response=InternalServerErrorSerializer,
                description="Error: Internal server error",
            ),
        },
    ),
    create=extend_schema(
        summary="Создание новой задачи для проекта",
        description="Этот метод позволяет создать новую задачу для проекта.",
        parameters=[
            OpenApiParameter("projects_id", int, OpenApiParameter.PATH, description="Введите уникальный ID проекта:")
        ],
        responses={
            200: OpenApiResponse(
                response=TaskPostSerializer,
                description="OK",
            ),
            400: OpenApiResponse(
                response=BadRequestProjectTaskErrorSerializer,
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
    retrieve=extend_schema(
        summary="Получить детали задачи в проекте",
        description="Этот метод позволяет получить детали задачи в проекте.",
        parameters=[
            OpenApiParameter("id", int, OpenApiParameter.PATH, description="Введите уникальный ID задачи:"),
            OpenApiParameter("projects_id", int, OpenApiParameter.PATH, description="Введите уникальный ID проекта:"),
        ],
        responses={
            200: OpenApiResponse(
                response=TaskPostSerializer,
                description="OK",
            ),
            401: OpenApiResponse(
                response=UnauthorizedErrorSerializer,
                description="Error: Unauthorized",
            ),
            404: OpenApiResponse(
                response=NotFoundErrorSerializer,
                description="Error: Not Found",
            ),
            500: OpenApiResponse(
                response=InternalServerErrorSerializer,
                description="Error: Internal server error",
            ),
        },
    ),
    update=extend_schema(
        request=TaskPostSerializer,
        summary="Изменение существующей задачи",
        description="Этот метод позволяет изменить существующую задачу в проекте.",
        parameters=[
            OpenApiParameter("id", int, OpenApiParameter.PATH, description="Введите уникальный ID задачи:"),
            OpenApiParameter("projects_id", int, OpenApiParameter.PATH, description="Введите уникальный ID проекта:"),
        ],
        responses={
            200: OpenApiResponse(
                response=TaskPostSerializer,
                description="OK",
            ),
            400: OpenApiResponse(
                response=BadRequestProjectTaskErrorSerializer,
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
    partial_update=extend_schema(
        request=TaskPostSerializer,
        summary="Частичное изменение задачи в проекте",
        description="Этот метод позволяет частично изменить задачу в проекте.",
        parameters=[
            OpenApiParameter("id", int, OpenApiParameter.PATH, description="Введите уникальный ID задачи:"),
            OpenApiParameter("projects_id", int, OpenApiParameter.PATH, description="Введите уникальный ID проекта:"),
        ],
        responses={
            200: OpenApiResponse(
                response=TaskPostSerializer,
                description="OK",
            ),
            400: OpenApiResponse(
                response=BadRequestProjectTaskErrorSerializer,
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
    destroy=extend_schema(
        summary="Удаление задачи из проекта",
        description="Этот метод позволяет удалить задачу из проекта.",
        parameters=[
            OpenApiParameter("id", int, OpenApiParameter.PATH, description="Введите уникальный ID задачи:"),
            OpenApiParameter("projects_id", int, OpenApiParameter.PATH, description="Введите уникальный ID проекта:"),
        ],
        responses={
            204: OpenApiResponse(
                description="OK",
            ),
            401: OpenApiResponse(
                response=UnauthorizedErrorSerializer,
                description="Error: Unauthorized",
            ),
            404: OpenApiResponse(
                response=NotFoundErrorSerializer,
                description="Error: Not Found",
            ),
            500: OpenApiResponse(
                response=InternalServerErrorSerializer,
                description="Error: Internal server error",
            ),
        },
    ),
)
