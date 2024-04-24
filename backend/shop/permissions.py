from rest_framework.permissions import BasePermission, SAFE_METHODS


class ProductObjectPermissions(BasePermission):
    def has_object_permission(self, request, view, obj):
        user = request.user

        if request.method in SAFE_METHODS:
            return True

        if user == obj.user:
            return True

        return False
