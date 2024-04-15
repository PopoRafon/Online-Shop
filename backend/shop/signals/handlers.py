from django.db.models.signals import post_save
from django.contrib.auth.models import User
from django.dispatch import receiver
from shop.models import Cart

@receiver(post_save, sender=User)
def create_user_cart(sender, instance, created, **kwargs):
    if created:
        cart = Cart.objects.create(user=instance)
        cart.save()
