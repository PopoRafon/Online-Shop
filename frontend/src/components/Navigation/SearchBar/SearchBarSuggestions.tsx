import type { Product } from '@interfaces/types';
import { memo } from 'react';
import { Link } from 'react-router-dom';

type SearchBarSuggestionsProps = {
    headerText: string;
    products: Product[];
}

const SearchBarSuggestions = memo(({ headerText, products }: SearchBarSuggestionsProps) => {
    return (
        <div className="primary-border navigation-searchbar-suggestions">
            {products.length === 0 ? (
                <div className="navigation-searchbar-suggestions-loader-container">
                    <div className="loader"></div>
                </div>
            ) : (
                products.every(product => Object.is(product, null)) ? (
                    <div className="navigation-searchbar-suggestions-no-products-found">No products were found</div>
                ) : (
                    <>
                        <h3 className="navigation-searchbar-suggestions-header">{headerText}</h3>
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
                    </>
                )
            )}
        </div>
    );
});

export default SearchBarSuggestions;
