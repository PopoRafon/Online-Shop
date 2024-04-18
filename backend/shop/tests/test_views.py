import tempfile
from PIL import Image
from http.cookies import SimpleCookie
from django.contrib.auth.models import User
from django.test import TestCase
from django.urls import reverse
from rest_framework_simplejwt.tokens import AccessToken
from shop.models import Product


class TestProductListCreateView(TestCase):
    def setUp(self):
        self.url = reverse('product-list-create')
        self.user = User.objects.create(username='test username')
        self.image = Image.new('RGB', (100, 100))
        self.tmp_file = tempfile.NamedTemporaryFile(suffix='.jpg')
        self.image.save(self.tmp_file)
        self.tmp_file.seek(0)
        self.data = {
            'name': 'test name',
            'amount': 5,
            'price': 5,
            'uploaded_images': [self.tmp_file]
        }

    def test_product_list_create_view_GET_receives_products_list(self):
        product = Product.objects.create(
            user=self.user,
            name='test product',
            description='test description',
            amount=5,
            price=10
        )
        response = self.client.get(self.url)
        response_data = response.json().get('success')

        self.assertEqual(response.status_code, 200)
        self.assertIsNotNone(response_data)
        self.assertEqual(response_data[0]['id'], str(product.id))
        self.assertEqual(response_data[0]['name'], product.name)
        self.assertEqual(response_data[0]['description'], product.description)
        self.assertEqual(response_data[0]['amount'], product.amount)
        self.assertEqual(response_data[0]['price'], product.price)
        self.assertEqual(response_data[0]['sold'], product.sold)

    def test_product_list_create_view_POST_receives_authentication_error(self):
        response = self.client.post(self.url, data=self.data)

        self.assertEqual(response.status_code, 401)
        self.assertIsNotNone(response.json().get('error'))
        self.assertEqual(Product.objects.count(), 0)

    def test_product_list_create_view_POST_creates_new_product(self):
        access_token = AccessToken.for_user(self.user)
        self.client.cookies = SimpleCookie({'access': access_token})
        response = self.client.post(self.url, data=self.data)

        self.assertEqual(response.status_code, 201)
        self.assertIsNotNone(response.json().get('success'))
        self.assertEqual(Product.objects.count(), 1)
