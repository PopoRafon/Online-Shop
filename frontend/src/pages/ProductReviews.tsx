import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import obtainCSRFToken from '@utils/csrfToken';

type Review = {
    user: string;
    text: string;
}

export default function ProductReviews() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [reviews, setReviews] = useState<Review[]>();

    useEffect(() => {
        obtainCSRFToken();

        fetch(`/api/products/${id}/reviews`, {
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
    }, [id, navigate]);

    return reviews && (
        <main className="product-page"></main>
    );
}
