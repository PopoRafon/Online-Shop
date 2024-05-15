import type { ActionsData } from './types';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

type ActionsProps = {
    actions: ActionsData;
    setActions: React.Dispatch<React.SetStateAction<ActionsData>>;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Actions({ actions, setActions, setShowModal }: ActionsProps) {
    useEffect(() => {
        const clickEventListener = () => {
            setActions({ ...actions, show: false });
        };

        document.addEventListener('click', clickEventListener);

        return () => document.removeEventListener('click', clickEventListener);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    function handleShowModal() {
        setActions({ ...actions, show: false });
        setShowModal(true);
    }

    return (
        <div
            className="primary-border my-products-actions"
            style={{ top: `${actions.top}px`, left: `calc(${actions.left}px - 5px)` }}
            onClick={event => event.stopPropagation()}
        >
            <Link
                className="primary-button my-products-actions-button"
                to={`/my-products/edit/product/${actions.productId}`}
            >
                Edit
            </Link>
            <button
                className="primary-button my-products-actions-button my-products-actions-delete-button"
                onClick={handleShowModal}
            >
                Delete
            </button>
        </div>
    );
}
