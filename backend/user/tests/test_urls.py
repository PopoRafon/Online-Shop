from django.urls import resolve, reverse
from rest_framework.test import APISimpleTestCase
from user.views import UserDetailView


class TestUserUrls(APISimpleTestCase):
    def test_user_url_resolves(self):
        url = reverse('user')
        resolver = resolve(url)

        self.assertEqual(url, '/api/user')
        self.assertEqual(resolver.func.view_class, UserDetailView)
