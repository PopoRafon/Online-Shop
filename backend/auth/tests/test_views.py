import re
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework_simplejwt.tokens import RefreshToken
from http.cookies import SimpleCookie


class TestCsrfTokenView(APITestCase):
    def test_csrf_token_view_GET_receives_new_token(self):
        url = reverse('csrftoken')
        response = self.client.get(url)
        response_json = response.json()

        self.assertEqual(response.status_code, 200)
        self.assertIsNotNone(response_json.get('success'))
        self.assertIsNotNone(re.match(r'^[a-zA-Z0-9]*$', response_json['success']))
        self.assertEqual(len(response_json['success']), 64)


class TestTokenRefreshView(APITestCase):
    def setUp(self):
        self.url = reverse('token-refresh')
        self.user = User.objects.create(username='test user')
        self.refresh_token = RefreshToken.for_user(self.user)

    def test_token_refresh_view_POST_receives_absence_of_refresh_token_error_response(self):
        response = self.client.post(self.url)

        self.assertEqual(response.status_code, 400)
        self.assertIsNotNone(response.json().get('error'))

    def test_token_refresh_view_POST_receives_invalid_refresh_token_error_response(self):
        self.client.cookies = SimpleCookie({'refresh': 'invalid.refresh.token'})
        response = self.client.post(self.url)

        self.assertEqual(response.status_code, 400)
        self.assertIsNotNone(response.json().get('error'))

    def test_token_refresh_view_POST_receives_new_token_in_cookies(self):
        self.client.cookies = SimpleCookie({'refresh': self.refresh_token})
        response = self.client.post(self.url)

        self.assertEqual(response.status_code, 200)
        self.assertIsNotNone(response.json().get('success'))
        self.assertIsNotNone(response.cookies.get('access'))


class TestRegisterView(APITestCase):
    def setUp(self):
        self.url = reverse('register')

    def test_register_view_POST_receives_error_response(self):
        data = {
            'email': 'email',
            'username': 'user',
            'password1': 'passwd',
            'password2': 'passwd'
        }
        response = self.client.post(self.url, data=data)
        response_json = response.json()

        self.assertEqual(response.status_code, 400)
        self.assertIsNotNone(response_json.get('error'))
        self.assertEqual(response_json['error'].keys(), data.keys())

    def test_register_view_POST_account_gets_created(self):
        data = {
            'email': 'testemail@gmail.com',
            'username': 'testusername',
            'password1': 'testpassword',
            'password2': 'testpassword',
            'rules': True
        }
        response = self.client.post(self.url, data=data)

        self.assertEqual(response.status_code, 201)
        self.assertEqual(User.objects.count(), 1)
        self.assertIsNotNone(response.json().get('success'))
        self.assertIsNotNone(response.cookies.get('refresh'))
        self.assertIsNotNone(response.cookies.get('access'))
