import type { Product } from '@interfaces/types';
import type { Review } from '@components/Reviews/types';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getReviews } from '@utils/reviews';
import obtainCSRFToken from '@utils/csrfToken';
import useUserContext from '@contexts/UserContext/useUserContext';
import ReviewsForm from '@components/Reviews/ReviewsForm';
import ReviewsBody from '@components/Reviews/ReviewsBody';

export default function Reviews() {
    const navigate = useNavigate();
    const { user } = useUserContext();
    const { id } = useParams();
    const [product, setProduct] = useState<Product>();
    const [reviews, setReviews] = useState<Review[]>([]);

    useEffect(() => {
        obtainCSRFToken();

        getReviews({
            productId: id ?? '',
            navigate: navigate,
            setReviews: setReviews
        });

        fetch(`/api/products/${id}`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setProduct(data.success);
                } else {
                    navigate('/');
                }
            });
    }, [id, navigate]);

    return reviews && product && (
        <main className="reviews-page">
            <section className="primary-border reviews-container">
                <ReviewsBody
                    product={product}
                    reviews={reviews}
                />
                {user.isLoggedIn && (
                    <ReviewsForm
                        productId={product.id}
                        setReviews={setReviews}
                    />
                )}
            </section>
        </main>
    );
}
