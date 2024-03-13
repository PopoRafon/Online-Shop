import re
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.models import User
from rest_framework.validators import UniqueValidator
from rest_framework import serializers


class RegisterSerializer(serializers.Serializer):
    email = serializers.EmailField(
        min_length=8,
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    username = serializers.CharField(
        min_length=8,
        max_length=16,
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    password1 = serializers.CharField(
        min_length=8,
        required=True
    )
    password2 = serializers.CharField(
        min_length=8,
        required=True
    )
    rules = serializers.BooleanField(
        required=True
    )

    def validate(self, attrs):
        username = attrs.get('username')
        password1 = attrs.get('password1')
        password2 = attrs.get('password2')
        rules = attrs.get('rules')
        errors = {}

        if not re.match(r'^\w*$', username):
            errors['username'] = 'Username can only contain letters, numbers and underscore.'

        if password1 != password2:
            errors['password2'] = 'Passwords must be the same.'

        try:
            validate_password(password1)
        except:
            errors['password1'] = 'Password is invalid.'

        if not rules:
            errors['rules'] = 'Terms of Service must be accepted.'

        if errors:
            raise serializers.ValidationError(errors)

        return attrs
