from http import HTTPStatus

import pytest


@pytest.mark.django_db(transaction=True)
class TestURL:
    def test_schema_url_exists_at_desired_location(self, client):
        response = client.get("/api/v1/schema/")
        assert response.status_code != HTTPStatus.NOT_FOUND, (
            "Эндпоинт `/api/v1/schema/` не найден. Проверьте настройки в " "*urls.py*."
        )
        assert response.status_code == HTTPStatus.OK, (
            "Проверьте, что GET-запрос неавторизованного пользователя к "
            "`/api/v1/schema/` возвращает ответ со статусом 200."
        )

    def test_swagger_url_exists_at_desired_location(self, client):
        response = client.get("/api/v1/swagger-ui/")
        assert response.status_code != HTTPStatus.NOT_FOUND, (
            "Эндпоинт `/api/v1/swagger-ui/` не найден. Проверьте настройки в " "*urls.py*."
        )
        assert response.status_code == HTTPStatus.OK, (
            "Проверьте, что GET-запрос неавторизованного пользователя к "
            "`/api/v1/swagger-ui/` возвращает ответ со статусом 200."
        )

    def test_redoc_url_exists_at_desired_location(self, client):
        response = client.get("/api/v1/redoc/")
        assert response.status_code != HTTPStatus.NOT_FOUND, (
            "Эндпоинт `/api/v1/redoc/` не найден. Проверьте настройки в " "*urls.py*."
        )
        assert response.status_code == HTTPStatus.OK, (
            "Проверьте, что GET-запрос неавторизованного пользователя к "
            "`/api/v1/redoc/` возвращает ответ со статусом 200."
        )
