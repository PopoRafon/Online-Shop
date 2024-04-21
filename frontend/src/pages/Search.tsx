import type { Product } from '@interfaces/types';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Search() {
    const { search } = useLocation();
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const name = search.split('=')[1];

        fetch(`/api/products?name=${name}`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setProducts(data.success);
                }
            });
    }, [search]);

    return (
        <main className="search-page">
            <section>
                <div className="primary-border search-head">
                    <h2 className="search-header">Product Name</h2>
                    <span className="search-offer-count">{products.length} offers</span>
                </div>
                <div className="search-body">
                    <div>
                        <span className="search-sorting-text">Sorting</span>
                        <select className="primary-border search-sorting-selection">
                            <option>Accurate</option>
                            <option>Date</option>
                            <option>Price: from highest</option>
                            <option>Price: from lowest</option>
                        </select>
                    </div>
                    {products.length > 0 ? (
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
                    ) : (
                        <div className="search-results-not-found">
                            No results were found matching your search.
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
