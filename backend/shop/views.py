from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework import generics
from .serializers import ProductSerializer, CartSerializer
from .renderers import ExtendedJSONRenderer
from .models import Product, Cart


class ProductListCreateView(generics.ListCreateAPIView):
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    renderer_classes = [ExtendedJSONRenderer]

    def get_queryset(self):
        queryset = Product.objects.all()
        query_params = self.request.query_params
        username = query_params.get('username')
        count = query_params.get('count')

        if username is not None:
            queryset = queryset.filter(user__username=username)

        if count is not None and count.isdecimal():
            queryset = queryset[:int(count)]

        return queryset.prefetch_related('images')


class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    lookup_url_kwarg = 'id'
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    renderer_classes = [ExtendedJSONRenderer]


class CartDetailView(generics.RetrieveUpdateAPIView):
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated]
    renderer_classes = [ExtendedJSONRenderer]

    def get_object(self):
        user = self.request.user
        queryset = Cart.objects.get(user=user)

        return queryset
