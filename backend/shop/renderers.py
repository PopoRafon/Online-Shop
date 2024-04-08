from rest_framework.renderers import JSONRenderer


class ExtendedJSONRenderer(JSONRenderer):
    def render(self, data, accepted_media_type=None, renderer_context=None):
        if renderer_context and renderer_context.get('response').status_code >= 400:
            data = {'error': data}
        else:
            data = {'success': data}

        return super(ExtendedJSONRenderer, self).render(data, accepted_media_type, renderer_context)
