from asgiref.sync import sync_to_async
from django.db.models.signals import post_save, pre_delete
from django.contrib.auth.models import User
from django.dispatch import receiver
from shop.models import Cart, NewsLetter, Discount, Product
from shop.tasks import create_discount_code_and_send_email

@receiver(post_save, sender=User)
def create_user_cart(instance, created, **kwargs):
    if created:
        cart = Cart.objects.create(user=instance)
        cart.save()

@receiver(pre_delete, sender=Product)
def delete_product_images_files(instance, **kwargs):
    for image in instance.images.all():
        image.image.delete()

@receiver(post_save, sender=NewsLetter)
def handle_newsletter_creation(instance, created, **kwargs):
    if created:
        email = instance.email
        create_discount_code_and_send_email.delay(email)

@receiver(post_save, sender=Discount)
async def remove_discount_from_database(instance, **kwargs):
    if instance.quantity <= 0:
        await sync_to_async(instance.delete)()
