import tempfile
from PIL import Image
from http.cookies import SimpleCookie
from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import AccessToken
from shop.models import Product, NewsLetter, Rating, Review


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


class TestProductDetailView(APITestCase):
    def setUp(self):
        self.user = User.objects.create(username='testuser')
        self.product = Product.objects.create(user=self.user, name='test product', amount=5, price=10)
        self.rating = Rating.objects.create(user=self.user, product=self.product, rating=2)
        self.review = Review.objects.create(user=self.user, product=self.product, text='testreview')
        self.url = reverse('product-detail', kwargs={'id': self.product.id})
        self.data = {'name': 'new product name'}

    def test_product_detail_view_GET_receives_product(self):
        response = self.client.get(self.url)
        response_json = response.json()

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response_json['success']['name'], self.product.name)
        self.assertEqual(response_json['success']['ratings'], [self.rating.rating])
        self.assertEqual(response_json['success']['reviews'], self.product.reviews.count())

    def test_product_detail_view_DELETE_receives_authentication_error_message(self):
        response = self.client.delete(self.url)

        self.assertEqual(response.status_code, 401)
        self.assertEqual(Product.objects.count(), 1)

    def test_product_detail_view_DELETE_receives_not_product_creator_error_message(self):
        new_user = User.objects.create(username='newuser')
        access_token = AccessToken.for_user(new_user)
        self.client.cookies = SimpleCookie({'access': access_token})
        response = self.client.delete(self.url)

        self.assertEqual(response.status_code, 403)
        self.assertEqual(Product.objects.count(), 1)

    def test_product_detail_view_DELETE_product_gets_deleted(self):
        access_token = AccessToken.for_user(self.user)
        self.client.cookies = SimpleCookie({'access': access_token})
        response = self.client.delete(self.url)

        self.assertEqual(response.status_code, 204)
        self.assertEqual(Product.objects.count(), 0)

    def test_product_detail_view_PATCH_receives_authentication_error_message(self):
        response = self.client.patch(self.url, data=self.data)

        self.assertEqual(response.status_code, 401)
        self.assertNotEqual(Product.objects.first().name, self.data['name'])

    def test_product_detail_view_PATCH_receives_not_product_creator_error_message(self):
        new_user = User.objects.create(username='newuser')
        access_token = AccessToken.for_user(new_user)
        self.client.cookies = SimpleCookie({'access': access_token})
        response = self.client.patch(self.url, data=self.data)

        self.assertEqual(response.status_code, 403)
        self.assertNotEqual(Product.objects.first().name, self.data['name'])

    def test_product_detail_view_PATCH_product_gets_update(self):
        access_token = AccessToken.for_user(self.user)
        self.client.cookies = SimpleCookie({'access': access_token})
        response = self.client.patch(self.url, data=self.data)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(Product.objects.first().name, self.data['name'])


class TestReviewListCreateView(APITestCase):
    def setUp(self):
        self.user = User.objects.create(username='testuser')
        self.product1 = Product.objects.create(user=self.user, name='first product', amount=10, price=20)
        self.product2 = Product.objects.create(user=self.user, name='second product', amount=20, price=30)
        self.review1 = Review.objects.create(user=self.user, product=self.product1, text='first review')
        self.review2 = Review.objects.create(user=self.user, product=self.product2, text='second review')
        self.url = reverse('review-list-create', kwargs={'id': self.product1.id})
        self.data = {'product': self.product1.id, 'text': 'third review'}

    def test_review_list_create_view_GET_receives_product_reviews(self):
        response = self.client.get(self.url)
        response_json = response.json()

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response_json['success']), 1)
        self.assertEqual(response_json['success'][0]['username'], self.review1.user.username)
        self.assertEqual(response_json['success'][0]['text'], self.review1.text)

    def test_review_list_create_view_POST_receives_authentication_error_message(self):
        response = self.client.post(self.url, data=self.data)

        self.assertEqual(response.status_code, 401)
        self.assertEqual(Review.objects.count(), 2)

    def test_review_list_create_view_POST_review_gets_created(self):
        access_token = AccessToken.for_user(self.user)
        self.client.cookies = SimpleCookie({'access': access_token})
        response = self.client.post(self.url, data=self.data)

        self.assertEqual(response.status_code, 201)
        self.assertEqual(Review.objects.count(), 3)

        new_review = Review.objects.get(text=self.data['text'])

        self.assertEqual(new_review.product, self.product1)
        self.assertEqual(new_review.user, self.user)


class TestRatingCreateView(APITestCase):
    def setUp(self):
        self.user = User.objects.create(username='testuser')
        self.product = Product.objects.create(user=self.user, name='test product', amount=15, price=10)
        self.url = reverse('rating-create', kwargs={'id': self.product.id})
        self.data = {'product': self.product.id, 'rating': 3}

    def test_rating_create_view_POST_receives_authentication_error_message(self):
        response = self.client.post(self.url, data=self.data)

        self.assertEqual(response.status_code, 401)
        self.assertEqual(Rating.objects.count(), 0)

    def test_rating_create_view_POST_rating_gets_created(self):
        access_token = AccessToken.for_user(self.user)
        self.client.cookies = SimpleCookie({'access': access_token})
        response = self.client.post(self.url, data=self.data)

        self.assertEqual(response.status_code, 201)
        self.assertEqual(Rating.objects.count(), 1)

        new_rating = Rating.objects.first()

        self.assertEqual(new_rating.product, self.product)
        self.assertEqual(new_rating.user, self.user)


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


class TestNewsLetterCreateView(APITestCase):
    def setUp(self):
        self.url = reverse('newsletter-create')

    def test_newsletter_create_view_POST_receives_error_message(self):
        data = {'email': ''}
        response = self.client.post(self.url, data=data)

        self.assertEqual(response.status_code, 400)
        self.assertEqual(NewsLetter.objects.count(), 0)

    def test_newsletter_create_view_POST_newsletter_model_gets_created(self):
        data = {'email': 'testemail@example.com'}
        response = self.client.post(self.url, data=data)

        self.assertEqual(response.status_code, 201)
        self.assertEqual(NewsLetter.objects.count(), 1)
        self.assertEqual(NewsLetter.objects.first().email, data['email'])
