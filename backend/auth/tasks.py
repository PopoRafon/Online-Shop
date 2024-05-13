from django.core.mail import send_mail
from django.conf import settings
from celery import shared_task

@shared_task
def send_email(subject, email, message, **kwargs):
    send_mail(
        subject=subject,
        message=message,
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[email],
        **kwargs
    )
