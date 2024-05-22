from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.template.loader import render_to_string
from django.middleware.csrf import get_token
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.conf import settings
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError
from .serializers import RegisterSerializer, NewPasswordSerializer
from .tasks import send_email
from shop.renderers import ExtendedJSONRenderer

@api_view(['GET'])
@renderer_classes([ExtendedJSONRenderer])
def csrf_token_view(request):
    token = get_token(request)
    return Response(token, status=status.HTTP_200_OK)


class TokenRefreshView(APIView):
    renderer_classes = [ExtendedJSONRenderer]

    def post(self, request):
        refresh_token = request.COOKIES.get('refresh')

        if refresh_token is not None:
            try:
                access = RefreshToken(refresh_token).access_token
            except TokenError:
                return Response(
                    'Your refresh token is invalid.',
                    status=status.HTTP_400_BAD_REQUEST
                )

            response = Response(
                'Your new access token has been successfully issued.',
                status=status.HTTP_200_OK
            )

            response.set_cookie(
                'access',
                access,
                max_age=settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'],
                httponly=True
            )

            return response
        else:
            return Response(
                'You must provide refresh token inorder to issue new access token.',
                status=status.HTTP_400_BAD_REQUEST
            )


class RegisterView(APIView):
    renderer_classes = [ExtendedJSONRenderer]

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

            response = Response(
                'Your account has been successfully created.',
                status=status.HTTP_201_CREATED
            )

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

            message = render_to_string('auth/welcome_email.html', context={
                'site_name': settings.SITE_NAME
            })

            send_email.delay(
                f'Welcome to {settings.SITE_NAME}',
                email,
                message
            )

            return response
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    renderer_classes = [ExtendedJSONRenderer]

    def post(self, request):
        data = request.data
        username = data.get('username')
        password = data.get('password')
        user = authenticate(username=username, password=password)

        if user:
            refresh = RefreshToken.for_user(user)
            access = refresh.access_token

            response = Response(
                'You have been successfully logged in.',
                status=status.HTTP_200_OK
            )

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
                'username': 'Username is incorrect.',
                'password': 'Password is incorrect.'
            }, status=status.HTTP_400_BAD_REQUEST)


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]
    renderer_classes = [ExtendedJSONRenderer]

    def post(self, request):
        response = Response(
            'You have been successfully logged out.',
            status=status.HTTP_200_OK
        )

        response.delete_cookie('refresh')
        response.delete_cookie('access')

        return response


class PasswordResetView(APIView):
    renderer_classes = [ExtendedJSONRenderer]

    def post(self, request):
        email = request.data.get('email')
        user = User.objects.filter(email=email).first()

        if user:
            uidb64 = urlsafe_base64_encode(force_bytes(user.id))
            token = PasswordResetTokenGenerator().make_token(user)

            message = render_to_string('auth/password_reset_email.html', context={
                'username': user.username,
                'uidb64': uidb64,
                'token': token,
                'domain': settings.BASE_DOMAIN,
                'site_name': settings.SITE_NAME
            })

            send_email.delay(
                subject='Password Reset',
                message=message,
                email=email
            )

            return Response(
                'Password reset message has been sent to your email.',
                status=status.HTTP_200_OK
            )
        else:
            return Response({
                'email': 'Must be valid email address.'
            }, status=status.HTTP_400_BAD_REQUEST)


class PasswordResetConfirmView(APIView):
    renderer_classes = [ExtendedJSONRenderer]

    def post(self, request, *args, **kwargs):
        uidb64 = kwargs.get('uidb64', '')

        try:
            id = urlsafe_base64_decode(uidb64).decode('utf-8')
            user = User.objects.get(id=id)
        except (ValueError, User.DoesNotExist):
            return Response(
                'User id you have provided is incorrect.',
                status=status.HTTP_400_BAD_REQUEST
            )

        token = kwargs.get('token')
        is_token_valid = PasswordResetTokenGenerator().check_token(user, token)

        if is_token_valid:
            serializer = NewPasswordSerializer(data=request.data)

            if serializer.is_valid():
                new_password = serializer.validated_data['newPassword1']

                user.set_password(new_password)
                user.save()

                return Response(
                    'Your password has been successfully changed.',
                    status=status.HTTP_200_OK
                )
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(
                'Token you provided is incorrect or has expired.',
                status=status.HTTP_400_BAD_REQUEST
            )


class PasswordChangeView(APIView):
    permission_classes = [IsAuthenticated]
    renderer_classes = [ExtendedJSONRenderer]

    def patch(self, request):
        user = request.user
        data = request.data

        if user.check_password(data.get('oldPassword')):
            serializer = NewPasswordSerializer(data=data)

            if serializer.is_valid():
                new_password = serializer.validated_data['newPassword1']

                user.set_password(new_password)
                user.save()

                return Response(
                    'Your password has been successfully changed.',
                    status=status.HTTP_200_OK
                )
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({
                'oldPassword': 'Must be your old password.'
            }, status=status.HTTP_400_BAD_REQUEST)
