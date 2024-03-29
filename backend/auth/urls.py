from django.urls import path
from .views import RegisterView, csrf_token_view, TokenRefreshView, LoginView, LogoutView, PasswordResetView, PasswordResetConfirmView

urlpatterns = [
    path('csrftoken', csrf_token_view, name='csrftoken'),
    path('token/refresh', TokenRefreshView.as_view(), name='token-refresh'),
    path('register', RegisterView.as_view(), name='register'),
    path('login', LoginView.as_view(), name='login'),
    path('logout', LogoutView.as_view(), name='logout'),
    path('password/reset', PasswordResetView.as_view(), name='password-reset'),
    path('password/reset/confirm/<uidb64>/<token>', PasswordResetConfirmView.as_view(), name='password-reset-confirm')
]
