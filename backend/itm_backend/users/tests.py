from django.contrib.auth import get_user_model
from django.test import Client, TestCase

User = get_user_model()


class CreateUserTests(TestCase):
    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.user = User.objects.create()

    def setUp(self):
        self.guest_client = Client()

    def test_user_registration_and_token_creation(self):
        users_count = User.objects.count()
        form_data = {
            'email': 'test@yandex.ru',
            "password": "securepassword",
            "first_name": "John",
            "last_name": "Doe",
        }
        response = self.guest_client.post(
            '/api/v1/auth/users/',
            data=form_data,
            follow=True,
        )
        self.assertEqual(response.status_code, 201)
        self.assertEqual(User.objects.count(), users_count + 1)
        self.assertTrue(User.objects.filter(email='test@yandex.ru').exists())
        print(response.json())

        form_data = {
            'email': 'test@yandex.ru',
            "password": "securepassword",
        }
        response = self.guest_client.post(
            '/api/v1/auth/jwt/create/',
            data=form_data,
            follow=True,
        )
        self.assertEqual(response.status_code, 200)
        print(response.json())
