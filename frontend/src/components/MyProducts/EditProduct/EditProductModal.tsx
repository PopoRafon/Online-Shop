import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import useAlertContext from '@contexts/AlertContext/useAlertContext';

type EditProductModalProps = {
    id: string;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EditProductModal({ id, setShowModal }: EditProductModalProps) {
    const navigate = useNavigate();
    const { setAlert } = useAlertContext();

    function handleProductDeletion() {
        const csrfToken: string = Cookies.get('csrftoken') ?? '';

        fetch(`/api/products/${id}`, {
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
            className="edit-product-modal"
            onClick={() => setShowModal(false)}
        >
            <div
                className="primary-border edit-product-modal-container"
                onClick={event => event.stopPropagation()}
            >
                <span>Are you sure you want to delete this product?</span>
                <span className="edit-product-modal-caution">(this action is irreversible)</span>
                <div className="edit-product-modal-buttons-container">
                    <button
                        onClick={handleProductDeletion}
                        className="primary-button edit-product-modal-button edit-product-modal-delete-button"
                    >
                        Delete
                    </button>
                    <button
                        onClick={() => setShowModal(false)}
                        className="primary-button edit-product-modal-button"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
