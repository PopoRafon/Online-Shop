from django.urls import path
from .views import (
    ProductListCreateView,
    ProductDetailView,
    CartDetailView,
    ReviewListCreateView,
    NewsLetterCreateView,
    RatingCreateView
)

urlpatterns = [
    path('products', ProductListCreateView.as_view(), name='product-list-create'),
    path('products/<id>', ProductDetailView.as_view(), name='product-detail'),
    path('products/<id>/reviews', ReviewListCreateView.as_view(), name='review-list-create'),
    path('products/<id>/ratings', RatingCreateView.as_view(), name='rating-create'),
    path('cart', CartDetailView.as_view(), name='cart-detail'),
    path('newsletter', NewsLetterCreateView.as_view(), name='newsletter-create')
]
