from rest_framework.test import APISimpleTestCase
from django.urls import resolve, reverse
from auth.views import RegisterView, TokenRefreshView, csrf_token_view, LoginView, LogoutView


class TestCsrfTokenUrls(APISimpleTestCase):
    def test_csrf_token_url_resolves(self):
        url = reverse('csrftoken')
        resolver = resolve(url)

        self.assertEqual(url, '/api/csrftoken')
        self.assertEqual(resolver.func, csrf_token_view)


class TestTokenRefreshUrls(APISimpleTestCase):
    def test_token_refresh_url_resolves(self):
        url = reverse('token-refresh')
        resolver = resolve(url)

        self.assertEqual(url, '/api/token/refresh')
        self.assertEqual(resolver.func.view_class, TokenRefreshView)


class TestRegisterUrls(APISimpleTestCase):
    def test_register_url_resolves(self):
        url = reverse('register')
        resolver = resolve(url)

        self.assertEqual(url, '/api/register')
        self.assertEqual(resolver.func.view_class, RegisterView)


class TestLoginUrls(APISimpleTestCase):
    def test_login_url_resolves(self):
        url = reverse('login')
        resolver = resolve(url)

        self.assertEqual(url, '/api/login')
        self.assertEqual(resolver.func.view_class, LoginView)


class TestLogoutUrls(APISimpleTestCase):
    def test_logout_url_resolves(self):
        url = reverse('logout')
        resolver = resolve(url)

        self.assertEqual(url, '/api/logout')
        self.assertEqual(resolver.func.view_class, LogoutView)
