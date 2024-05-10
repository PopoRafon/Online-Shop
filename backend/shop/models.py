import uuid
from django.core.validators import MaxValueValidator, MinValueValidator, MinLengthValidator
from django.contrib.auth.models import User
from django.db import models
from .utils import create_product_image_name


class Product(models.Model):
    CATEGORY_CHOICES = (
        ('electronics', 'Electronics'),
        ('children', 'Children'),
        ('art', 'Art'),
        ('health', 'Health'),
        ('entertainment', 'Entertainment'),
        ('automotive', 'Automotive')
    )
    id = models.UUIDField(primary_key=True, editable=False, default=uuid.uuid4)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='products')
    name = models.CharField(
        max_length=64,
        validators=[
            MinLengthValidator(4)
        ]
    )
    description = models.TextField(null=True, blank=True, max_length=1024)
    amount = models.IntegerField(
        validators=[
            MaxValueValidator(1_000_000),
            MinValueValidator(1)
        ]
    )
    price = models.DecimalField(
        max_digits=11,
        decimal_places=2,
        validators=[
            MaxValueValidator(1_000_000),
            MinValueValidator(0.01)
        ]
    )
    sold = models.IntegerField(null=True, blank=True, default=0)
    category = models.CharField(max_length=13, choices=CATEGORY_CHOICES)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Name: {self.name} Id: {self.id}'


class ProductImage(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='images')
    image = models.FileField(upload_to=create_product_image_name)


class Cart(models.Model):
    user = models.OneToOneField(User, primary_key=True, on_delete=models.CASCADE, related_name='cart')
    products = models.ManyToManyField(Product)

    def __str__(self):
        return self.user.username


class Review(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='reviews')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reviews')
    text = models.TextField(
        max_length=512,
        validators=[
            MinLengthValidator(4)
        ]
    )
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created']

    def __str__(self):
        return f'User: {self.user.username} Product: {self.product.name}'


class Rating(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='ratings')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='ratings')
    rating = models.IntegerField(
        validators=[
            MaxValueValidator(5),
            MinValueValidator(1)
        ]
    )

    def __str__(self):
        return f'User: {self.user.username} Product: {self.product.name}'
