from django.middleware.csrf import get_token
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.conf import settings
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError
from .serializers import RegisterSerializer

@api_view(['GET'])
def csrf_token_view(request):
    token = get_token(request)
    return Response({'success': token})


class TokenRefreshView(APIView):
    def post(self, request):
        refresh_token = request.COOKIES.get('refresh')

        if refresh_token is not None:
            try:
                access = RefreshToken(refresh_token).access_token
            except TokenError:
                return Response({
                    'error': 'Your refresh token is invalid.'
                }, status=status.HTTP_400_BAD_REQUEST)

            response = Response({
                'success': 'Your new access token has been successfully issued.'
            }, status=status.HTTP_200_OK)

            response.set_cookie(
                'access',
                access,
                max_age=settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'],
                httponly=True
            )

            return response
        else:
            return Response({
                'error': 'You must provide refresh token inorder to issue new access token.'
            }, status=status.HTTP_400_BAD_REQUEST)


class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)

        if serializer.is_valid():
            email = serializer.validated_data['email']
            username = serializer.validated_data['username']
            password = serializer.validated_data['password1']

            user = User.objects.create_user(
                email=email,
                username=username,
                password=password
            )

            refresh = RefreshToken.for_user(user)
            access = refresh.access_token

            response = Response({
                'success': 'Your account has been successfully created.'
            }, status=status.HTTP_201_CREATED)

            response.set_cookie(
                'refresh',
                refresh,
                max_age=settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'],
                httponly=True
            )

            response.set_cookie(
                'access',
                access,
                max_age=settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'],
                httponly=True
            )

            return response
        else:
            return Response({
                'error': serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    def post(self, request):
        data = request.data
        username = data.get('username')
        password = data.get('password')
        user = authenticate(username=username, password=password)

        if user:
            refresh = RefreshToken.for_user(user)
            access = refresh.access_token

            response = Response({
                'success': 'You have been successfully logged in.'
            }, status=status.HTTP_200_OK)

            response.set_cookie(
                'refresh',
                refresh,
                max_age=settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'],
                httponly=True
            )

            response.set_cookie(
                'access',
                access,
                max_age=settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'],
                httponly=True
            )

            return response
        else:
            return Response({
                'error': {
                    'username': 'Username is incorrect.',
                    'password': 'Password is incorrect.'
                }
            }, status=status.HTTP_400_BAD_REQUEST)
