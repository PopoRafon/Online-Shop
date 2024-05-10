from django.apps import AppConfig


class UserConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'user'
    label = 'online_shop_user'

    def ready(self):
        import user.signals.handlers
