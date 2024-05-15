import type { ActionsData } from '@components/MyProducts/Home/types';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import MyProductsTable from '@components/MyProducts/Home/MyProductsTable';
import Actions from '@components/MyProducts/Home/Actions';
import ActionsDeletionModal from '@components/MyProducts/Home/ActionsDeletionModal';

export default function MyProducts() {
    const [actions, setActions] = useState<ActionsData>({ show: false, productId: '', top: 0, left: 0 });
    const [showModal, setShowModal] = useState<boolean>(false);

    return (
        <main className="my-products-page">
            {showModal && (
                <ActionsDeletionModal
                    productId={actions.productId}
                    setShowModal={setShowModal}
                />
            )}
            <section className="my-products-container">
                <div className="my-products-header">
                    <h3 className="my-products-header-text">My products</h3>
                    <Link
                        to='/my-products/add/product'
                        className="primary-button my-products-header-add-button"
                    >
                        ADD NEW
                    </Link>
                </div>
                <div className="custom-scrollbar primary-border my-products-body">
                    {actions.show && (
                        <Actions
                            actions={actions}
                            setActions={setActions}
                            setShowModal={setShowModal}
                        />
                    )}
                    <MyProductsTable
                        setActions={setActions}
                    />
                </div>
            </section>
        </main>
    );
}
