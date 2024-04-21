from django.contrib.auth.models import User
from django.test import TestCase
from shop.models import Cart


class TestCartModel(TestCase):
    def test_cart_model_gets_created_after_user_creation(self):
        user = User.objects.create(username='test user')

        self.assertEqual(Cart.objects.count(), 1)
        self.assertEqual(Cart.objects.first(), user.cart)
        self.assertEqual(user.cart.products.count(), 0)
