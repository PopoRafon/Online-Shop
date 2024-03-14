from django.urls import path
from .views import RegisterView, csrf_token_view, TokenRefreshView

urlpatterns = [
    path('csrftoken', csrf_token_view, name='csrftoken'),
    path('token/refresh', TokenRefreshView.as_view(), name='token-refresh'),
    path('register', RegisterView.as_view(), name='register')
]
