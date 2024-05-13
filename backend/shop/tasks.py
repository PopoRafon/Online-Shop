import secrets
import string
from celery import shared_task
from django.template.loader import render_to_string
from django.conf import settings
from auth.tasks import send_email
from .models import Discount

@shared_task
def create_discount_code_and_send_email(email):
    characters = string.ascii_letters + string.digits
    code = ''.join(secrets.choice(characters) for _ in range(16))

    Discount.objects.create(
        code=code,
        percentage_value=10,
        quantity=1
    )

    message = render_to_string('shop/discount_email.html', context={
        'email': email,
        'code': code,
        'site_name': settings.SITE_NAME
    })

    send_email.delay(
        subject='Your Exclusive 10% Discount!',
        message=message,
        email=email
    )
