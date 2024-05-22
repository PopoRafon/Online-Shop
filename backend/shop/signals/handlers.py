from django.db.models.signals import post_save, pre_delete
from django.contrib.auth.models import User
from django.dispatch import receiver
from shop.models import Cart, NewsLetter, Discount, ProductImage
from shop.tasks import create_discount_code_and_send_email, delete_image_file

@receiver(post_save, sender=User)
def create_user_cart(instance, created, **kwargs):
    if created:
        cart = Cart.objects.create(user=instance)
        cart.save()

@receiver(pre_delete, sender=ProductImage)
def handle_product_image_deletion(instance, **kwargs):
    image = instance.image
    delete_image_file.delay(image.path)

@receiver(post_save, sender=NewsLetter)
def handle_newsletter_creation(instance, created, **kwargs):
    if created:
        email = instance.email
        create_discount_code_and_send_email.delay(email)

@receiver(post_save, sender=Discount)
def remove_discount_from_database(instance, **kwargs):
    if instance.quantity <= 0:
        instance.delete()
