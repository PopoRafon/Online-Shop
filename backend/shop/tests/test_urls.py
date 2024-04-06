from rest_framework.test import APISimpleTestCase
from django.urls import resolve, reverse
from shop.views import ProductListCreateView, ProductDetailView


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
