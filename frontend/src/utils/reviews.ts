import type { AlertData } from '@contexts/AlertContext/AlertContextProvider';
import type { Review } from '@components/Reviews/types';
import type { NavigateFunction } from 'react-router-dom';
import Cookies from 'js-cookie';

type GetReviewsArgs = {
    productId: string;
    navigate: NavigateFunction;
    setReviews: React.Dispatch<React.SetStateAction<Review[]>>;
}

async function getReviews({ productId, navigate, setReviews }: GetReviewsArgs): Promise<void> {
    return await fetch(`/api/products/${productId}/reviews`, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                setReviews(data.success);
            } else {
                navigate('/');
            }
        });
}

type CreateReviewArgs = {
    productId: string;
    text: string;
    setText: React.Dispatch<React.SetStateAction<string>>;
    setAlert: React.Dispatch<React.SetStateAction<AlertData>>;
    setReviews: React.Dispatch<React.SetStateAction<Review[]>>;
    setTextError: React.Dispatch<React.SetStateAction<string>>;
}

async function createReview({ productId, text, setText, setAlert, setReviews, setTextError }: CreateReviewArgs): Promise<void> {
    const csrfToken: string = Cookies.get('csrftoken') ?? '';

    return await fetch(`/api/products/${productId}/reviews`, {
        method: 'POST',
        headers: {
            'X-CSRFToken': csrfToken, // eslint-disable-line @typescript-eslint/naming-convention
            'Content-Type': 'application/json' // eslint-disable-line @typescript-eslint/naming-convention
        },
        body: JSON.stringify({ text: text, product: productId })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                setText('');
                setAlert({
                    show: true,
                    type: 'success',
                    text: 'Your review has been successfully created.'
                });
                setReviews(prev => [
                    data.success,
                    ...prev
                ]);
            } else if (data.error) {
                setTextError(data.error.text);
            }
        });
}

export { getReviews, createReview };
