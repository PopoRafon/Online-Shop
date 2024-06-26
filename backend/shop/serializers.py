from django.conf import settings
from rest_framework import serializers, validators
from .models import Product, ProductImage, Review, NewsLetter, Rating


class ProductSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(
        default=serializers.CurrentUserDefault()
    )
    username = serializers.ReadOnlyField(source='user.username')
    images = serializers.SerializerMethodField()
    ratings = serializers.SerializerMethodField()
    reviews = serializers.ReadOnlyField(source='reviews.count')
    uploaded_images = serializers.ListField(
        child=serializers.ImageField(allow_empty_file=False, use_url=False),
        write_only=True,
        allow_empty=False,
        min_length=1,
        max_length=12,
        required=True
    )

    class Meta:
        model = Product
        fields = '__all__'
        extra_kwargs = {
            'sold': {
                'read_only': True
            },
            'price': {
                'coerce_to_string': False
            }
        }

    def get_images(self, obj):
        return [image.image.url for image in obj.images.all()]

    def get_ratings(self, obj):
        return [rating.rating for rating in obj.ratings.all()]

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

    def update(self, instance, validated_data):
        uploaded_images = validated_data.pop('uploaded_images', None)

        if uploaded_images is not None:
            product_images = instance.images.all()
            images = {image.image.name.split('/')[-1]: image for image in product_images}

            for image in uploaded_images:
                if image.name in images.keys():
                    images.pop(image.name)
                else:
                    ProductImage.objects.create(product=instance, image=image)

            for image in images.values():
                image.delete()

        return super().update(instance, validated_data)


class ReviewSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(
        default=serializers.CurrentUserDefault(),
        write_only=True
    )
    username = serializers.CharField(
        source='user.username',
        read_only=True
    )

    class Meta:
        model = Review
        exclude = ['id']
        extra_kwargs = {
            'product': {
                'write_only': True
            }
        }


class NewsLetterSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsLetter
        fields = ['email']


class RatingSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(
        default=serializers.CurrentUserDefault(),
        write_only=True
    )

    class Meta:
        model = Rating
        fields = '__all__'
        extra_kwargs = {
            'product': {
                'write_only': True
            }
        }
        validators = [
            validators.UniqueTogetherValidator(
                queryset=model.objects.all(),
                fields=('user', 'product'),
                message=('You can only submit one rating per product.')
            )
        ]
