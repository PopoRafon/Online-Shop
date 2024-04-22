import type { Product } from '@interfaces/types';
import { Link } from 'react-router-dom';

type SearchResultsProps = {
    products: Product[];
}

export default function SearchResults({ products }: SearchResultsProps) {
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
                        <div className="search-result-product-price">{product.price.toFixed(2)}$</div>
                    </Link>
                </li>
            ))}
        </ul>
    );
}
