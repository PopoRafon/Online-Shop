from http.cookies import SimpleCookie
from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import AccessToken


class TestUserDetailView(APITestCase):
    def setUp(self):
        self.url = reverse('user')
        self.user = User.objects.create(email='testemail@example.com', username='testusername')

    def test_user_detail_view_GET_receives_user_data(self):
        access_token = AccessToken.for_user(self.user)
        self.client.cookies = SimpleCookie({'access': access_token})
        response = self.client.get(self.url)
        response_json = response.json()

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response_json['success']['username'], self.user.username)

    def test_user_detail_view_GET_receives_authentication_error(self):
        response = self.client.get(self.url)

        self.assertEqual(response.status_code, 401)
        self.assertIsNone(response.json().get('success'))

    def test_user_detail_view_PATCH_email_gets_changed(self):
        data = {'email': 'newemail@example.com'}
        access_token = AccessToken.for_user(self.user)
        self.client.cookies = SimpleCookie({'access': access_token})
        response = self.client.patch(self.url, data=data)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(User.objects.first().email, data['email'])
