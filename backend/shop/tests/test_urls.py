from rest_framework.test import APISimpleTestCase
from django.urls import resolve, reverse
from shop.views import ProductListCreateView, ProductDetailView, CartDetailView, ReviewListCreateView


class TestProductUrls(APISimpleTestCase):
    def test_product_list_create_url_resolves(self):
        url = reverse('product-list-create')
        resolver = resolve(url)

        self.assertEqual(url, '/api/products')
        self.assertEqual(resolver.func.view_class, ProductListCreateView)

    def test_product_detail_url_resolves(self):
        product_id = 1
        url = reverse('product-detail', kwargs={'id': product_id})
        resolver = resolve(url)

        self.assertEqual(url, f'/api/products/{product_id}')
        self.assertEqual(resolver.func.view_class, ProductDetailView)


class TestCartUrls(APISimpleTestCase):
    def test_cart_detail_url_resolves(self):
        url = reverse('cart-detail')
        resolver = resolve(url)

        self.assertEqual(url, '/api/cart')
        self.assertEqual(resolver.func.view_class, CartDetailView)


class TestReviewUrls(APISimpleTestCase):
    def test_review_list_create_url_resolves(self):
        product_id = 1
        url = reverse('review-list-create', kwargs={'id': product_id})
        resolver = resolve(url)

        self.assertEqual(url, f'/api/products/{product_id}/reviews')
        self.assertEqual(resolver.func.view_class, ReviewListCreateView)
