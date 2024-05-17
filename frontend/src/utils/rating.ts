import type { AlertData } from '@contexts/AlertContext/AlertContextProvider';
import type { Product } from '@interfaces/types';
import Cookies from 'js-cookie';

type CreateRatingArgs = {
    productId: string;
    rating: number;
    setAlert: React.Dispatch<React.SetStateAction<AlertData>>;
    product: Product;
    setProduct: React.Dispatch<React.SetStateAction<Product>>;
    setStars: React.Dispatch<React.SetStateAction<number>>;
}

async function createRating({ productId, rating, setAlert, product, setProduct, setStars }: CreateRatingArgs): Promise<void> {
    const csrfToken: string = Cookies.get('csrftoken') ?? '';

    return await fetch(`/api/products/${productId}/ratings`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // eslint-disable-line @typescript-eslint/naming-convention
            'X-CSRFToken': csrfToken // eslint-disable-line @typescript-eslint/naming-convention
        },
        body: JSON.stringify({ rating: rating, product: productId })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const newStars: number = (product.ratings.reduce((previous, current) => previous + current, 0) + rating) / (product.ratings.length + 1);

                setProduct({ ...product, ratings: [...product.ratings, rating] });
                setStars(newStars);
                setAlert({
                    type: 'success',
                    show: true,
                    text: 'Your rating has been successfully created.'
                });
            }
        });
}

export { createRating };
