import uuid

def create_product_image_name(instance, filename):
    """
    Create and return hash name for user uploaded product images.
    """
    extension = filename.split('.')[-1]
    hashed_file_name = f'{uuid.uuid4()}.{extension}'
    return f'products/{hashed_file_name}'
