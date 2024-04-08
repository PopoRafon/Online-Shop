from django.conf import settings
from rest_framework import serializers
from .models import Product, ProductImage


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['image']


class ProductSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(
        default=serializers.CurrentUserDefault()
    )
    images = ProductImageSerializer(many=True, read_only=True)
    uploaded_images = serializers.ListField(
        child=serializers.ImageField(allow_empty_file=False, use_url=False),
        write_only=True,
        allow_empty=False,
        min_length=1,
        max_length=8,
        required=True
    )

    class Meta:
        model = Product
        fields = '__all__'
        extra_kwargs = {'sold': {'read_only': True}}

    def validate_uploaded_images(self, images):
        for image in images:
            image_types = image.content_type.split('/')

            if image_types[0] not in settings.CONTENT_TYPES or image_types[1] not in settings.IMAGE_EXTENSIONS:
                raise serializers.ValidationError({'image': 'Images must be of .jpg, .jpeg or .png format.'})

            if image.size > settings.MAX_UPLOAD_SIZE:
                raise serializers.ValidationError({'image': 'Image size cannot be bigger than 2.5MB.'})

        return images

    def create(self, validated_data):
        uploaded_images = validated_data.pop('uploaded_images')
        product = Product.objects.create(**validated_data)

        for image in uploaded_images:
            ProductImage.objects.create(product=product, image=image)

        return product
