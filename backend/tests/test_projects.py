from http import HTTPStatus

import pytest
from django.db.utils import IntegrityError
from projects.models import Project


@pytest.mark.django_db(transaction=True)
class TestProjectAPI:
    VALID_DATA = {"description": "Поменяли текст статьи"}
    project_list_url = "/api/v1/projects/"
    project_detail_url = "/api/v1/projects/{project_id}/"

    def test_project_not_found(self, client, project):
        response = client.get(self.project_list_url)

        assert response.status_code != HTTPStatus.NOT_FOUND, (
            f"Эндпоинт `{self.project_list_url}` не найден, проверьте настройки " "в *urls.py*."
        )

    def test_project_list_not_auth(self, unauthenticated_client):
        response = unauthenticated_client.get(self.project_list_url)

        assert response.status_code == HTTPStatus.UNAUTHORIZED, (
            "Проверьте, что GET-запрос неавторизованного пользователя к "
            f"`{self.project_list_url}` возвращает ответ со статусом 401."
        )

    def test_project_single_not_auth(self, unauthenticated_client, project):
        response = unauthenticated_client.get(self.project_detail_url.format(project_id=project.id))
        assert response.status_code == HTTPStatus.UNAUTHORIZED, (
            "Проверьте, что GET-запрос неавторизованного пользователя к "
            f"`{self.project_detail_url}` возвращает ответ со статусом 401."
        )

    def test_project_auth_get(self, user_client, project, another_project):
        response = user_client.get(self.project_list_url)
        assert response.status_code == HTTPStatus.OK, (
            "Проверьте, что GET-запрос авторизованного пользователя к "
            f"`{self.project_list_url}` возвращает статус 200."
        )

        test_data = response.json()
        assert isinstance(test_data, list), (
            "Проверьте, что GET-запрос авторизованного пользователя к " f"`{self.project_list_url}` возвращает список."
        )

        assert len(test_data) == Project.objects.count(), (
            "Проверьте, что GET-запрос авторизованного пользователя к "
            f"`{self.project_list_url}` возвращает список всех проектов."
        )

    def test_projects_create_auth_with_invalid_data(self, user_client):
        projects_count = Project.objects.count()
        response = user_client.post(self.project_list_url, data={})
        assert response.status_code == HTTPStatus.BAD_REQUEST, (
            "Проверьте, что для авторизованного пользователя POST-запрос с "
            f"некорректными данными к `{self.project_list_url}` возвращает ответ "
            "со статусом 400."
        )
        assert projects_count == Project.objects.count(), (
            f"Проверьте, что POST-запрос с некорректными данными, "
            f"отправленный к `{self.project_list_url}`, не создаёт новый проект."
        )

    def test_project_create_auth_with_valid_data(self, user_client, user):
        projects_count = Project.objects.count()

        assert_msg = (
            "Проверьте, что для авторизованного пользователя  POST-запрос с "
            f"корректными данными к `{self.project_list_url}` возвращает ответ "
            "со статусом 201."
        )
        data = {
            "name": "Проект для теста",
            "description": "Описание тестового проекта",
            "start": "2023-08-20",
            "deadline": "2023-08-20",
            "status": "Onboarding",
            "priority": "maximum",
        }
        try:
            response = user_client.post(self.project_list_url, data=data)
        except IntegrityError as error:
            raise AssertionError(assert_msg + (f" В процессе выполнения запроса произошла ошибка: {error}"))
        assert response.status_code == HTTPStatus.CREATED, assert_msg
        projects_count += 1

        test_data = response.json()
        assert isinstance(test_data, dict), (
            "Проверьте, что для авторизованного пользователя POST-запрос к "
            f"`{self.projects_list_url}` возвращает ответ, содержащий данные "
            "нового проекта в виде словаря."
        )
        assert test_data.get("description") == data["description"], (
            "Проверьте, что для авторизованного пользователя POST-запрос к "
            f"`{self.project_list_url}` возвращает ответ, содержащий описание "
            "нового проекта в неизменном виде."
        )
        assert test_data.get("name") == data["name"], (
            "Проверьте, что для авторизованного пользователя при создании "
            f"проекта через POST-запрос к `{self.project_list_url}` возвращает ответ,"
            " содержащий имя проекта "
        )

        assert projects_count == Project.objects.count(), (
            "Проверьте, что POST-запрос с корректными данными от "
            f"авторизованного пользователя к `{self.project_list_url}` создаёт "
            "новый проект."
        )

    def test_project_unauth_create(
        self,
        client,
        user,
        unauthenticated_client,
    ):
        project_count = Project.objects.count()

        data = {
            "name": "Проект для теста",
            "description": "Описание тестового проекта",
            "start": "2023-08-20",
            "deadline": "2023-08-20",
            "status": "Onboarding",
            "priority": "maximum",
        }
        assert_msg = (
            "Проверьте, что POST-запрос неавторизованного пользователя к "
            f"`{self.project_list_url}` возвращает ответ со статусом 401."
        )
        try:
            response = client.post(self.project_list_url, data=data)
        except ValueError as error:
            raise AssertionError(assert_msg + ("\nВ процессе выполнения запроса произошла ошибка: " f"{error}"))
        assert response.status_code == HTTPStatus.UNAUTHORIZED, assert_msg

        assert project_count == Project.objects.count(), (
            "Проверьте, что POST-запрос неавторизованного пользователя к "
            f"`{self.project_list_url}` не создаёт новый проект."
        )
