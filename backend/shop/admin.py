from django.contrib import admin
from .models import Product, ProductImage, Cart

admin.site.register(Product)
admin.site.register(ProductImage)
admin.site.register(Cart)
