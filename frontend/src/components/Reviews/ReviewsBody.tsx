import type { Product } from '@interfaces/types';
import type { Review } from './types';

type ReviewsBodyProps = {
    product: Product;
    reviews: Review[];
}

export default function ReviewsBody({ product, reviews }: ReviewsBodyProps) {
    return (
        <div>
            <div>
                <h3 className="reviews-product-header">Product reviews</h3>
                <div className="reviews-product-name">{product.name}</div>
            </div>
            <ul className="custom-scrollbar reviews-list">
                {reviews.map((review, index) => (
                    <li
                        className="primary-border reviews-list-item"
                        key={index}
                    >
                        <div className="reviews-list-item-header">
                            <span className="reviews-list-item-header-date">{review.created}</span>
                            <span className="reviews-list-item-header-username">bought by {review.username}</span>
                        </div>
                        <div className="reviews-list-item-body">{review.text}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
