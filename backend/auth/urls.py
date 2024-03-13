from django.urls import path
from .views import RegisterView, csrf_token_view

urlpatterns = [
    path('csrftoken', csrf_token_view, name='csrftoken'),
    path('register', RegisterView.as_view(), name='register')
]
