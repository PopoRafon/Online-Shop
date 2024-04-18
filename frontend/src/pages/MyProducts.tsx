import { Link } from 'react-router-dom';
import MyProductsBody from '@components/MyProducts/Home/MyProductsBody';

export default function MyProducts() {
    return (
        <main className="my-products-page">
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
                <MyProductsBody />
            </section>
        </main>
    );
}
