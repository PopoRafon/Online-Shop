from http.cookies import SimpleCookie
from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import RefreshToken


class TestUserView(APITestCase):
    def setUp(self):
        self.url = reverse('user')

    def test_user_view_GET_receives_user_data(self):
        user = User.objects.create(username='testusername')
        access_token = RefreshToken.for_user(user).access_token
        self.client.cookies = SimpleCookie({'access': access_token})
        response = self.client.get(self.url)
        response_json = response.json()

        self.assertEqual(response.status_code, 200)
        self.assertIsNotNone(response_json.get('success'))
        self.assertEqual(response_json['success']['username'], user.username)

    def test_user_view_GET_receives_authentication_error(self):
        response = self.client.get(self.url)

        self.assertEqual(response.status_code, 401)
        self.assertIsNone(response.json().get('success'))
