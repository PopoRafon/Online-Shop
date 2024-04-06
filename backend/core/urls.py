from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('api/', include('auth.urls')),
    path('api/', include('user.urls')),
    path('api/', include('shop.urls')),
    path('admin/', admin.site.urls)
]
