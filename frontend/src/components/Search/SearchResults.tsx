import type { Product } from '@interfaces/types';
import { Link } from 'react-router-dom';
import useUserContext from '@contexts/UserContext/useUserContext';

type SearchResultsProps = {
    products: Product[];
}

export default function SearchResults({ products }: SearchResultsProps) {
    const { user } = useUserContext();

    return (
        <ul className="search-results-container">
            {products.map(product => (
                <li
                    className="primary-border search-result"
                    key={product.id}
                >
                    <Link
                        to={`/product/${product.id}`}
                        className="search-result-product"
                    >
                        <img
                            src={product.images[0]}
                            style={{ minWidth: '100px', minHeight: '100px' }}
                            width={100}
                            height={100}
                            alt="Product image"
                        />
                        <div className="search-result-product-name">{product.name}</div>                                    
                        <div className="search-result-product-price">
                            {(product.price * user.currency.multiplier).toFixed(2)}{user.currency.symbol}
                        </div>
                    </Link>
                </li>
            ))}
        </ul>
    );
}
