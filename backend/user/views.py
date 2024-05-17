from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from .serializers import UserSerializer
from shop.renderers import ExtendedJSONRenderer


class UserDetailView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    renderer_classes = [ExtendedJSONRenderer]

    def get_object(self):
        return self.request.user
