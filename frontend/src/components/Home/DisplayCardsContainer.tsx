import type { Product } from '@interfaces/types';
import { Link } from 'react-router-dom';
import useUserContext from '@contexts/UserContext/useUserContext';

type DisplayCardsContainerProps = {
    title: string;
    note: string;
    products: Product[];
}

export default function DisplayCardsContainer({ title, note, products }: DisplayCardsContainerProps) {
    const { user } = useUserContext();

    return (
        <section className="home-display-cards-container">
            <div className="home-display-cards-container-header">
                <h2 className="home-display-cards-container-header-title">{title}</h2>
                <span className="home-display-cards-container-header-note">{note}</span>
            </div>
            <div className="home-display-cards-container-body">
                {products.map((product, index) => (
                    product ? (
                        <Link
                            to={`/product/${product.id}`}
                            className="primary-border display-card"
                            key={product.id}
                        >
                            <img
                                className="display-card-cover"
                                src={product.images[0]}
                                alt="Product image"
                            />
                            <div className="display-card-description">
                                <span className="display-card-name">{product.name}</span>
                                <span className="display-card-price">
                                    {(product.price * user.currency.multiplier).toFixed(2)}{user.currency.symbol}
                                </span>
                            </div>
                        </Link>
                    ) : (
                        <div className="primary-border display-card" key={index}></div>
                    )
                ))}
            </div>
        </section>
    );
}
