from django.contrib import admin
from .models import Product, ProductImage, Cart, Review, Rating, NewsLetter, Discount

admin.site.register(Product)
admin.site.register(ProductImage)
admin.site.register(Cart)
admin.site.register(Review)
admin.site.register(Rating)
admin.site.register(NewsLetter)
admin.site.register(Discount)
