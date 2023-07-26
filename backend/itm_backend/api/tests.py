from django.test import TestCase, Client


class StaticURLTests(TestCase):
    def setUp(self):
        self.guest_client = Client()

    def test_schema_url_exists_at_desired_location(self):
        response = self.guest_client.get('/api/v1/schema/')
        self.assertEqual(response.status_code, 200)

    def test_swaggerui_url_exists_at_desired_location(self):
        response = self.guest_client.get('/api/v1/swagger-ui/')
        self.assertEqual(response.status_code, 200)

    def test_redoc_url_exists_at_desired_location(self):
        response = self.guest_client.get('/api/v1/redoc/')
        self.assertEqual(response.status_code, 200)
