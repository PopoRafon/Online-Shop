from django.conf.urls.static import static
from django.urls import path, include
from django.contrib import admin
from django.conf import settings

urlpatterns = [
    path('api/', include('auth.urls')),
    path('api/', include('user.urls')),
    path('api/', include('shop.urls')),
    path('admin/', admin.site.urls)
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
