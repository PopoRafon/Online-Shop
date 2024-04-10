# Generated by Django 5.0.3 on 2024-04-10 14:12

import django.core.validators
import django.db.models.deletion
import shop.utils
import uuid
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=64, validators=[django.core.validators.MinLengthValidator(4)])),
                ('description', models.TextField(blank=True, max_length=1024, null=True)),
                ('amount', models.IntegerField(validators=[django.core.validators.MaxValueValidator(1000000), django.core.validators.MinValueValidator(1)])),
                ('price', models.FloatField(validators=[django.core.validators.MaxValueValidator(1000000), django.core.validators.MinValueValidator(0.01)])),
                ('sold', models.IntegerField(blank=True, default=0, null=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='products', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='ProductImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.FileField(upload_to=shop.utils.create_product_image_name)),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='images', to='online_shop_shop.product')),
            ],
        ),
    ]
