import type { ChangeEvent, FormEvent } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import useAlertContext from '@contexts/AlertContext/useAlertContext';
import WarningIcon from '@assets/images/icons/warning_icon.svg';

type ActionsDeletionModalProps = {
    productId: string;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ActionsDeletionModal({ productId, setShowModal }: ActionsDeletionModalProps) {
    const navigate = useNavigate();
    const { setAlert } = useAlertContext();
    const [confirmation, setConfirmation] = useState<string>('');
    const [disallowDeletion, setDisallowDeletion] = useState<boolean>(true);

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const { value } = event.target;

        setConfirmation(value);

        if (value === 'I agree') {
            setDisallowDeletion(false);
        } else if (!disallowDeletion) {
            setDisallowDeletion(true);
        }
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const csrfToken: string = Cookies.get('csrftoken') ?? '';

        fetch(`/api/products/${productId}`, {
            method: 'DELETE',
            headers: {
                'X-CSRFToken': csrfToken // eslint-disable-line @typescript-eslint/naming-convention
            }
        })
            .then(response => {
                if (response.status === 204) {
                    setAlert({
                        show: true,
                        type: 'success',
                        text: 'Your product has been successfully deleted.'
                    });
                    navigate('/');
                }
            });
    }

    return (
        <div
            className="my-products-actions-modal"
            onClick={() => setShowModal(false)}
        >
            <form
                noValidate
                className="primary-border my-products-actions-modal-form"
                onClick={event => event.stopPropagation()}
                onSubmit={handleSubmit}
                aria-label="Product deletion form"
            >
                <h3 className="my-products-actions-modal-header">Delete product?</h3>
                <div className="my-products-actions-modal-caution">
                    <img
                        src={WarningIcon}
                        className="my-products-actions-modal-caution-warning-icon"
                        alt="Warning icon"
                    />
                    <span>This action cannot be undone!</span>
                </div>
                <p className="my-products-actions-modal-text">Do you really want to delete this product?</p>
                <label className="my-products-actions-modal-input-label">
                    To confirm this, type "I agree".
                    <input
                        type="text"
                        value={confirmation}
                        onChange={handleChange}
                        className="primary-border my-products-actions-modal-input"
                    />
                </label>
                <div className="my-products-actions-modal-buttons-container">
                    <button
                        className="primary-border my-products-actions-modal-button my-products-actions-modal-delete-button"
                        type="submit"
                        disabled={disallowDeletion}
                    >
                        Delete
                    </button>
                    <button
                        onClick={() => setShowModal(false)}
                        className="primary-border my-products-actions-modal-button my-products-actions-modal-cancel-button"
                        type="button"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
