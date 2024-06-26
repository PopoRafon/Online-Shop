from django.core.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics, status
from .permissions import ProductObjectPermissions
from .serializers import ProductSerializer, ReviewSerializer, NewsLetterSerializer, RatingSerializer
from .renderers import ExtendedJSONRenderer
from .models import Product, Cart, Review
from .utils import filter_products


class ProductListCreateView(generics.ListCreateAPIView):
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    renderer_classes = [ExtendedJSONRenderer]
    pagination_class = LimitOffsetPagination

    def get_queryset(self):
        queryset = Product.objects.all()
        queryset = filter_products(queryset, self.request.query_params)

        return queryset.prefetch_related('images')


class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    lookup_url_kwarg = 'id'
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, ProductObjectPermissions]
    renderer_classes = [ExtendedJSONRenderer]


class ReviewListCreateView(generics.ListCreateAPIView):
    serializer_class = ReviewSerializer
    renderer_classes = [ExtendedJSONRenderer]
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        product_id = self.kwargs.get('id')

        return Review.objects.filter(product__id=product_id)


class RatingCreateView(generics.CreateAPIView):
    serializer_class = RatingSerializer
    permission_classes = [IsAuthenticated]
    renderer_classes = [ExtendedJSONRenderer]


class CartDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        cart = Cart.objects.prefetch_related('products').get(user=user)
        products = cart.products.all()
        data = []

        for product in products:
            data.append({
                'id': product.id,
                'name': product.name,
                'images': [image.image.url for image in product.images.all()],
                'description': product.description,
                'amount': product.amount,
                'price': product.price,
                'sold': product.sold
            })

        return Response({
            'success': data
        }, status=status.HTTP_200_OK)

    def delete(self, request):
        product_id = request.data.get('product_id')

        if product_id:
            user = request.user
            cart = Cart.objects.get(user=user)

            try:
                product = cart.products.get(id=product_id)
                cart.products.remove(product)

                return Response({
                    'success': 'Product from your cart has been successfully removed.'
                }, status=status.HTTP_200_OK)
            except (Product.DoesNotExist, ValidationError):
                return Response({
                    'error': 'Your cart doesn\'t contain product with provided id.'
                }, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({
                'error': 'You need to provide product id inorder to remove it from your cart.'
            }, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request):
        product_id = request.data.get('product_id')

        if product_id:
            user = request.user
            cart = Cart.objects.get(user=user)

            try:
                product = Product.objects.get(id=product_id)
                cart.products.add(product)

                return Response({
                    'success': 'Product has been successfully added to your cart.'
                }, status=status.HTTP_200_OK)
            except (Product.DoesNotExist, ValidationError):
                return Response({
                    'error': 'Product with provided id doesn\'t exist.'
                }, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({
                'error': 'You need to provide product id inorder to add it to your cart.'
            }, status=status.HTTP_400_BAD_REQUEST)


class NewsLetterCreateView(generics.CreateAPIView):
    serializer_class = NewsLetterSerializer
    renderer_classes = [ExtendedJSONRenderer]
