from django.middleware.csrf import get_token
from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .serializers import RegisterSerializer

@api_view(['GET'])
def csrf_token_view(request):
    token = get_token(request)
    return Response({'success': token})


class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)

        if serializer.is_valid():
            email = serializer.validated_data['email']
            username = serializer.validated_data['username']
            password = serializer.validated_data['password1']

            User.objects.create(
                email=email,
                username=username,
                password=password
            )

            return Response({
                'success': 'Your account has been successfully created.'
            }, status=status.HTTP_201_CREATED)
        else:
            return Response({
                'error': serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)
