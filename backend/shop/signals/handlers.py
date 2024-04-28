from asgiref.sync import sync_to_async
from django.db.models.signals import post_save, pre_delete
from django.contrib.auth.models import User
from django.dispatch import receiver
from shop.models import Cart, ProductImage

@receiver(post_save, sender=User)
def create_user_cart(instance, created, **kwargs):
    if created:
        cart = Cart.objects.create(user=instance)
        cart.save()

@receiver(pre_delete, sender=ProductImage)
async def delete_product_image_file(instance, **kwargs):
    image = instance.image
    await sync_to_async(image.delete)()
