import tempfile
from PIL import Image
from http.cookies import SimpleCookie
from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import AccessToken
from shop.models import Product


class TestProductListCreateView(APITestCase):
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
            'uploaded_images': [self.tmp_file],
            'category': 'electronics'
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

        product = Product.objects.first()
        product_image = product.images.first()
        product_image.image.delete()


class TestCartDetailView(APITestCase):
    def setUp(self):
        self.url = reverse('cart-detail')
        self.user = User.objects.create(username='test user')
        self.access_token = AccessToken.for_user(self.user)
        self.client.cookies = SimpleCookie({'access': self.access_token})
        self.product = Product.objects.create(
            user=self.user,
            name='test product',
            description='test description',
            amount=5,
            price=10
        )
        self.user.cart.products.add(self.product)

    def test_cart_detail_view_GET_receives_all_products(self):
        response = self.client.get(self.url)
        response_data = response.json().get('success')

        self.assertEqual(response.status_code, 200)
        self.assertIsNotNone(response_data)
        self.assertEqual(response_data[0]['id'], str(self.product.id))
        self.assertEqual(response_data[0]['name'], self.product.name)
        self.assertEqual(response_data[0]['images'], [])
        self.assertEqual(response_data[0]['description'], self.product.description)
        self.assertEqual(response_data[0]['amount'], self.product.amount)
        self.assertEqual(response_data[0]['price'], self.product.price)
        self.assertEqual(response_data[0]['sold'], self.product.sold)

    def test_cart_detail_view_DELETE_receives_not_found_error_response(self):
        response = self.client.delete(self.url, data={'product_id': 'testid'})

        self.assertEqual(response.status_code, 404)
        self.assertIsNotNone(response.json().get('error'))
        self.assertEqual(self.user.cart.products.count(), 1)

    def test_cart_detail_view_DELETE_removes_product_from_cart(self):
        response = self.client.delete(self.url, data={'product_id': self.product.id})

        self.assertEqual(response.status_code, 200)
        self.assertIsNotNone(response.json().get('success'))
        self.assertEqual(self.user.cart.products.count(), 0)

    def test_cart_detail_view_PATCH_receives_not_found_error_response(self):        
        response = self.client.patch(self.url, data={'product_id': 'testid'})

        self.assertEqual(response.status_code, 404)
        self.assertIsNotNone(response.json().get('error'))
        self.assertEqual(self.user.cart.products.count(), 1)

    def test_cart_detail_view_PATCH_adds_product_to_cart(self):
        product = Product.objects.create(
            user=self.user,
            name='new product',
            description='new description',
            amount=1,
            price=5
        )
        response = self.client.patch(self.url, data={'product_id': product.id})

        self.assertEqual(response.status_code, 200)
        self.assertIsNotNone(response.json().get('success'))
        self.assertEqual(self.user.cart.products.count(), 2)
