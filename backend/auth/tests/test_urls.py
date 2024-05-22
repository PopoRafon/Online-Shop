from rest_framework.test import APISimpleTestCase
from django.urls import resolve, reverse
from auth.views import (
    RegisterView,
    TokenRefreshView,
    csrf_token_view,
    LoginView,
    LogoutView,
    PasswordResetView,
    PasswordResetConfirmView,
    PasswordChangeView
)


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


class TestPasswordUrls(APISimpleTestCase):
    def test_password_reset_url_resolves(self):
        url = reverse('password-reset')
        resolver = resolve(url)

        self.assertEqual(url, '/api/password/reset')
        self.assertEqual(resolver.func.view_class, PasswordResetView)

    def test_password_reset_confirm_url_resolves(self):
        uidb64 = 'testuidb64'
        token = 'testtoken'
        url = reverse('password-reset-confirm', kwargs={'uidb64': uidb64, 'token': token})
        resolver = resolve(url)

        self.assertEqual(url, f'/api/password/reset/confirm/{uidb64}/{token}')
        self.assertEqual(resolver.func.view_class, PasswordResetConfirmView)

    def test_password_change_url_resolves(self):
        url = reverse('password-change')
        resolver = resolve(url)

        self.assertEqual(url, '/api/password/change')
        self.assertEqual(resolver.func.view_class, PasswordChangeView)
