import type { Product } from '@interfaces/types';
import { Link } from 'react-router-dom';

type SearchBarSuggestionsProps = {
    products: Product[];
}

export default function SearchBarSuggestions({ products }: SearchBarSuggestionsProps) {
    return (
        <div className="primary-border navigation-searchbar-suggestions">
            <h3 className="navigation-searchbar-suggestions-header">Found products</h3>
            <ul className="navigation-searchbar-suggestions-list">
                {products.map(product =>
                    product && (
                        <li key={product.id}>
                            <Link
                                className="navigation-searchbar-suggestions-product"
                                to={`/product/${product.id}`}
                            >
                                <div className="navigation-searchbar-suggestions-product-name">
                                    <img
                                        src={product.images[0]}
                                        className="navigation-searchbar-suggestions-product-image"
                                        alt="Product image"
                                    />
                                    {product.name}
                                </div>
                                <div className="navigation-searchbar-suggestions-product-price">
                                    {product.price.toFixed(2)}$
                                </div>
                            </Link>
                        </li>
                    )
                )}
            </ul>
        </div>
    );
}
