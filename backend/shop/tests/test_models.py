from django.contrib.auth.models import User
from django.test import TestCase
from shop.models import Cart, Discount


class TestCartModel(TestCase):
    def test_cart_model_gets_created_after_user_creation(self):
        user = User.objects.create(username='test user')

        self.assertEqual(Cart.objects.count(), 1)
        self.assertEqual(Cart.objects.first(), user.cart)
        self.assertEqual(user.cart.products.count(), 0)


class TestDiscountModel(TestCase):
    def test_discount_model_gets_deleted_after_quantity_equals_zero(self):
        discount = Discount.objects.create(code='testcode', percentage_value=10, quantity=5)
        discount.quantity = 3
        discount.save()

        self.assertEqual(Discount.objects.count(), 1)

        discount.quantity = 0
        discount.save()

        self.assertEqual(Discount.objects.count(), 0)
