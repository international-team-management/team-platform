import pytest
from rest_framework_simplejwt.tokens import AccessToken


@pytest.fixture
def unauthenticated_client():
    from rest_framework.test import APIClient

    return APIClient()


@pytest.fixture
def token_user_superuser(user_superuser):
    token = AccessToken.for_user(user_superuser)
    return {
        "access": str(token),
    }


@pytest.fixture
def user(django_user_model):
    return django_user_model.objects.create_user(
        email="test@yandex.ru",
        password="securepassword",
        first_name="John",
        last_name="Doe",
    )


@pytest.fixture
def user2(django_user_model):
    return django_user_model.objects.create_user(
        email="ivan@yandex.ru",
        password="securepassword",
        first_name="Ivan",
        last_name="Ivanovich",
    )


@pytest.fixture
def token(user):
    token = AccessToken.for_user(user)
    return {
        "access": str(token),
    }


@pytest.fixture
def user_client(token):
    from rest_framework.test import APIClient

    client = APIClient()
    client.credentials(HTTP_AUTHORIZATION=f'Bearer {token["access"]}')
    return client
