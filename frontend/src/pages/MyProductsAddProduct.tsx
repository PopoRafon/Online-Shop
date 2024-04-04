import { Link } from 'react-router-dom';
import AddProductForm from '@components/MyProducts/AddProduct/AddProductForm';
import LeftArrowIcon from '@assets/images/icons/left_arrow_icon.svg';

export default function MyProductsAddProduct() {
    return (
        <main className="my-products-page">
            <section className="my-products-container">
                <div className="my-products-header">
                    <Link
                        to="/my-products"
                        className="my-products-header-go-back-button"
                    >
                        <img
                            src={LeftArrowIcon}
                            width={40}
                            alt="Go back button"
                        />
                        Go Back
                    </Link>
                </div>
                <AddProductForm />
            </section>
        </main>
    );
}
