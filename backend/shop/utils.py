import uuid

def create_product_image_name(instance, filename):
    """
    Create and return hash name for user uploaded product images.
    """
    extension = filename.split('.')[-1]
    hashed_file_name = f'{uuid.uuid4()}.{extension}'
    return f'products/{hashed_file_name}'

def filter_products(queryset, query_params):
    """
    Filter and return products queryset based on user provided query parameters.
    """
    name = query_params.get('name')
    category = query_params.get('category')
    sort = query_params.get('sort')
    user = query_params.get('user')

    if name is not None:
        queryset = queryset.filter(name__icontains=name)

    if category is not None:
        queryset = queryset.filter(category__icontains=category)

    if user is not None:
        queryset = queryset.filter(user__username=user)

    if sort is not None:
        match (sort):
            case 'newest-first':
                queryset = queryset.order_by('-created')
            case 'price-lowest-first':
                queryset = queryset.order_by('price')
            case 'price-highest-first':
                queryset = queryset.order_by('-price')
            case 'sold-lowest-first':
                queryset = queryset.order_by('sold')
            case 'sold-highest-first':
                queryset = queryset.order_by('-sold')

    return queryset
