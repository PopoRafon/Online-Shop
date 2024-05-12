import secrets
import string
from asgiref.sync import sync_to_async
from django.db.models.signals import post_save, pre_delete
from django.template.loader import render_to_string
from django.contrib.auth.models import User
from django.core.mail import send_mail
from django.dispatch import receiver
from django.conf import settings
from shop.models import Cart, ProductImage, NewsLetter, Discount

@receiver(post_save, sender=User)
def create_user_cart(instance, created, **kwargs):
    if created:
        cart = Cart.objects.create(user=instance)
        cart.save()

@receiver(pre_delete, sender=ProductImage)
async def delete_product_image_file(instance, **kwargs):
    image = instance.image
    await sync_to_async(image.delete)()

@receiver(post_save, sender=NewsLetter)
async def create_discount_code_and_send_it_via_email(instance, created, **kwargs):
    if created:
        email = instance.email
        characters = string.ascii_letters + string.digits
        code = ''.join(secrets.choice(characters) for _ in range(16))

        await sync_to_async(Discount.objects.create)(
            code=code,
            percentage_value=10,
            quantity=1
        )

        message = render_to_string('shop/discount_email.html', context={
            'email': email,
            'code': code,
            'site_name': settings.SITE_NAME
        })

        send_mail(
            subject='Your Exclusive 10% Discount!',
            message=message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[email],
        )

@receiver(post_save, sender=Discount)
async def remove_discount_from_database(instance, **kwargs):
    if instance.quantity <= 0:
        await sync_to_async(instance.delete)()
