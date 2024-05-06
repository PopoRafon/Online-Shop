import type { ChangeEvent, FormEvent } from 'react';
import { useState } from 'react';

export default function ReviewsForm() {
    const [text, setText] = useState<string>();

    function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
        const { value } = event.target;

        setText(value);
    }

    function handleSubmit(event: FormEvent) {
        event.preventDefault();
    }

    return (
        <form
            noValidate
            aria-label="Review creation form"
            className="reviews-form"
            onSubmit={handleSubmit}
        >
            <textarea
                className="primary-border reviews-form-input"
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
