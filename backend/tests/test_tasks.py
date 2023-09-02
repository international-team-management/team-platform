from http import HTTPStatus

import pytest
from projects.models import Task


@pytest.mark.django_db(transaction=True)
class TestTaskAPI:
    TEXT_FOR_TASK = "Новая задача"
    tasks_url = "/api/v1/projects/{project_id}/tasks/"
    task_detail_url = "/api/v1/projects/{project_id}/tasks/{task_id}/"

    def check_task_data(self, response_data, request_method_and_url, db_task=None):
        expected_fields = ("id", "name", "priority", "assigned_to", "status", "description", "deadline")
        for field in expected_fields:
            assert field in response_data, (
                "Проверьте, что для авторизованного пользователя при "
                f"{request_method_and_url} ответ содержит поле "
                f"задачи `{field}`."
            )
        if db_task:
            assert response_data["creator"]["email"] == db_task.creator.username, (
                "Проверьте, что для авторизованного пользователя при "
                f"{request_method_and_url} ответ содержит поле "
                "задачи `creator`, и в этом поле указан `username` автора "
                "задачи"
            )
            assert response_data["id"] == db_task.id, (
                "Проверьте, что для авторизованного пользователя при "
                f"{request_method_and_url} ответ содержит корректный "
                "`id` задачи."
            )

    def test_tasks_not_authenticated(self, client, project):
        response = client.get(self.tasks_url.format(project_id=project.id))
        assert response.status_code == HTTPStatus.UNAUTHORIZED, (
            "Проверьте, что GET-запрос неавторизованного пользователя к "
            f"`{self.tasks_url}` возвращает ответ со статусом 401."
        )

    def test_comment_single_not_authenticated(self, client, project, task):
        response = client.get(self.task_detail_url.format(project_id=project.id, task_id=task.id))
        assert response.status_code == HTTPStatus.UNAUTHORIZED, (
            "Проверьте, что GET-запрос неавторизованного пользователя к "
            f"`{self.task_detail_url}` возвращает ответ со статусом 401."
        )

    def test_tasks_url_not_found(self, user_client, project):
        response = user_client.get(self.tasks_url.format(project_id=project.id))
        assert response.status_code != HTTPStatus.NOT_FOUND, (
            f"Эндпоинт `{self.tasks_url}` не найден, проверьте настройки в " "*urls.py*."
        )

    def test_tasks_id_available(self, user_client, project, task):
        response = user_client.get(self.task_detail_url.format(project_id=project.id, task_id=task.id))
        assert response.status_code != HTTPStatus.NOT_FOUND, (
            f"Эндпоинт `{self.task_detail_url}` не найден, проверьте " "настройки в *urls.py*."
        )

    def test_tasks_get(self, user_client, project, task, task2):
        response = user_client.get(self.tasks_url.format(project_id=project.id))
        assert response.status_code == HTTPStatus.OK, (
            "Проверьте, что при GET-запросе авторизованного пользователя к "
            f"`{self.tasks_url}` возвращается ответ со статусом 200."
        )
        test_data = response.json()
        assert isinstance(test_data, list), (
            "Проверьте, что при GET-запросе авторизованного пользователя к "
            f"`{self.tasks_url}` данные возвращаются в виде списка."
        )
        assert len(test_data) == Task.objects.filter(task_project=project.id).count(), (
            "Проверьте, что при GET-запросе авторизованного пользователя к "
            f"`{self.tasks_url}` возвращаются данные о задачах "
            "только к конкретному проекту."
        )

        task = Task.objects.filter(task_project=project).first()
        test_task = test_data[0]
        self.check_task_data(test_task, f"GET-запросе к `{self.tasks_url}`", db_task=task)

    def test_task_auth_project_with_invalid_data(self, user_client, project):
        task_count = Task.objects.count()

        response = user_client.post(self.tasks_url.format(project_id=project.id), data={})
        assert response.status_code == HTTPStatus.BAD_REQUEST, (
            "Проверьте, что POST-запрос с некорректными данными от "
            f"авторизованного пользователя к `{self.tasks_url}` возвращает "
            "ответ со статусом 400."
        )
        assert task_count == Task.objects.count(), (
            "Проверьте, что при POST-запросе с некорректными данными к "
            f"`{self.tasks_url}` новая задача не создаётся."
        )

    def test_task_id_auth_get(self, user_client, project, task, user):
        response = user_client.get(self.task_detail_url.format(project_id=project.id, task_id=task.id))
        assert response.status_code == HTTPStatus.OK, (
            "Проверьте, что GET-запрос авторизованного пользователя к "
            f"`{self.task_detail_url}` возвращает ответ со статусом 200."
        )

        test_data = response.json()
        assert test_data.get("name") == task.name, (
            "Проверьте, что для авторизованного пользователя GET-запрос к "
            f"`{self.task_detail_url}` возвращает ответ, содержащий название "
            "задачи."
        )
        assert test_data.get("creator")["username"] == user.username, (
            "Проверьте, что для авторизованного пользователя GET-запрос к "
            f"`{self.task_detail_url}` возвращает ответ, содержащий "
            "`username` автора."
        )

    @pytest.mark.parametrize("http_method", ("put", "patch"))
    def test_task_change_not_auth_with_valid_data(self, client, project, task, http_method):
        request_func = getattr(client, http_method)
        response = request_func(
            self.task_detail_url.format(project_id=project.id, task_id=task.id),
            data={"description": self.TEXT_FOR_TASK},
        )
        http_method = http_method.upper()
        assert response.status_code == HTTPStatus.UNAUTHORIZED, (
            f"Проверьте, что для неавторизованного пользователя {http_method}"
            f"-запрос к `{self.task_detail_url}` возвращает ответ со "
            "статусом 401."
        )
        db_task = Task.objects.filter(id=task.id).first()
        assert db_task.description != self.TEXT_FOR_TASK, (
            f"Проверьте, что для неавторизованного пользователя {http_method}"
            f"-запрос к `{self.task_detail_url}` не вносит изменения в "
            "задачу."
        )

    def test_task_delete_by_author(self, user_client, project, task):
        response = user_client.delete(self.task_detail_url.format(project_id=project.id, task_id=task.id))
        assert response.status_code == HTTPStatus.NO_CONTENT, (
            "Проверьте, что DELETE-запрос, отправленный авторизованным "
            "пользователем к собственной задаче на эндпоинт "
            f"`{self.task_detail_url}`, возвращает ответ со статусом 204."
        )

        test_comment = Task.objects.filter(id=project.id).first()
        assert not test_comment, (
            "Проверьте, что DELETE-запрос автора задаче к " f"`{self.task_detail_url}` удаляет задачу."
        )
