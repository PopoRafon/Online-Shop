from django.contrib.auth.models import User
from rest_framework.test import APITestCase
from shop.utils import filter_products
from shop.models import Product


class TestFilterProductsUtil(APITestCase):
    def setUp(self):
        self.user = User.objects.create(username='testuser')
        self.product1 = Product.objects.create(user=self.user, name='first product', amount=10, price=30)
        self.product2 = Product.objects.create(user=self.user, name='second product', amount=15, price=10)
        self.product3 = Product.objects.create(user=self.user, name='third product', amount=25, price=20)
        self.queryset = Product.objects.all()

    def test_filter_products_util_queryset_gets_sorted(self):
        query_params = {'sort': 'price-lowest-first'}
        queryset = filter_products(self.queryset, query_params)

        self.assertEqual(queryset.first(), self.product2)

    def test_filter_products_util_queryset_gets_filtered(self):
        query_params = {'name': 'third'}
        queryset = filter_products(self.queryset, query_params)

        self.assertEqual(queryset.count(), 1)
        self.assertEqual(queryset.first(), self.product3)
