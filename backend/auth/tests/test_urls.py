from rest_framework.test import APISimpleTestCase
from django.urls import resolve, reverse
from auth.views import RegisterView, TokenRefreshView, csrf_token_view


class TestCsrfTokenUrls(APISimpleTestCase):
    def test_csrf_token_url_resolves(self):
        url = reverse('csrftoken')
        resolver = resolve(url)

        self.assertEqual(resolver.func, csrf_token_view)


class TestTokenRefreshUrls(APISimpleTestCase):
    def test_token_refresh_url_resolves(self):
        url = reverse('token-refresh')
        resolver = resolve(url)

        self.assertEqual(resolver.func.view_class, TokenRefreshView)


class TestRegisterUrls(APISimpleTestCase):
    def test_register_url_resolves(self):
        url = reverse('register')
        resolver = resolve(url)

        self.assertEqual(resolver.func.view_class, RegisterView)
