from django.urls import path
from .views import ProductListCreateView, ProductDetailView, CartDetailView

urlpatterns = [
    path('products', ProductListCreateView.as_view(), name='product-list-create'),
    path('products/<id>', ProductDetailView.as_view(), name='product-detail'),
    path('cart', CartDetailView.as_view(), name='cart-detail')
]
