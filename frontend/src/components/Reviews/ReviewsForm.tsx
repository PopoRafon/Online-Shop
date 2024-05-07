import type { Review } from './types';
import type { ChangeEvent, FormEvent } from 'react';
import { useState } from 'react';
import { isReviewsFormValid } from '@helpers/formValidators';
import { createReview } from '@utils/reviews';
import useAlertContext from '@contexts/AlertContext/useAlertContext';

type ReviewsFormProps = {
    productId: string;
    setReviews: React.Dispatch<React.SetStateAction<Review[]>>;
}

export default function ReviewsForm({ productId, setReviews }: ReviewsFormProps) {
    const { setAlert } = useAlertContext();
    const [text, setText] = useState<string>('');
    const [textError, setTextError] = useState<string>('');

    function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
        const { value } = event.target;

        setText(value);
    }

    function handleSubmit(event: FormEvent) {
        event.preventDefault();

        if (isReviewsFormValid({ formData: text, setFormErrors: setTextError })) {
            createReview({ productId, text, setText, setAlert, setReviews, setTextError });
        }
    }

    return (
        <form
            noValidate
            aria-label="Review creation form"
            className="reviews-form"
            onSubmit={handleSubmit}
        >
            <textarea
                className={`primary-border reviews-form-input ${textError && 'reviews-form-input-error'}`}
                rows={1}
                onChange={handleChange}
                value={text}
                autoComplete="off"
            />
            <input
                className="primary-button reviews-form-submit"
                type="submit"
                value="Create"
            />
        </form>
    );
}
