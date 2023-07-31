import pytest
from rest_framework.test import APIClient
from rest_framework_simplejwt.tokens import AccessToken


@pytest.fixture
def user_superuser(django_user_model):
    return django_user_model.objects.create_superuser(
        email='superuser@yandex.ru',
        username='TestSuperuser',
        password="securepassword",
        first_name="SuperUser",
        last_name="Super",
    )


@pytest.fixture
def token_user_superuser(user_superuser):
    token = AccessToken.for_user(user_superuser)
    return {
        'access': str(token),
    }


@pytest.fixture
def user_superuser_client(token_user_superuser):
    client = APIClient()
    client.credentials(
        HTTP_AUTHORIZATION=f'Bearer {token_user_superuser["access"]}'
    )
    return client


@pytest.fixture
def user(django_user_model):
    return django_user_model.objects.create_user(
        email='test@yandex.ru',
        password="securepassword",
        first_name="John",
        last_name="Doe",
    )


@pytest.fixture
def another_user(django_user_model):
    return django_user_model.objects.create_user(
        email='testanother@mail.ru',
        password='1234567',
        first_name="Test2",
        last_name="Testovich",
    )


"""@pytest.fixture
def token(user):
    token = AccessToken.for_user(user)
    return {
        'access': str(token),
    }"""

@pytest.fixture
def token(user):
    from rest_framework_simplejwt.tokens import RefreshToken
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }


@pytest.fixture
def user_client(token):
    from rest_framework.test import APIClient

    client = APIClient()
    client.credentials(HTTP_AUTHORIZATION=f'Bearer {token["access"]}')
    return client
