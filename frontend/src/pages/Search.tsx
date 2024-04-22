import type { Product } from '@interfaces/types';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SearchResults from '@components/Search/SearchResults';
import SearchResultsNotFound from '@components/Search/SearchResultsNotFound';
import SearchPagination from '@components/Search/SearchPagination';

export type SearchResultsPagination = {
    products: Product[];
    next: string | null;
    previous: string | null;
    count: number;
}

export default function Search() {
    const { search } = useLocation();
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [pagination, setPagination] = useState<SearchResultsPagination>({ products: [], next: null, previous: null, count: 0 });

    useEffect(() => {
        (async () => {
            const queryString = search.split('?')[1];

            await fetch(`/api/products?${queryString}`, {
                method: 'GET'
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        const { results, next, previous, count } = data.success;

                        setPagination({
                            products: results,
                            next: next,
                            previous: previous,
                            count: count
                        });
                    }
                });

            setIsLoaded(true);
        })();
    }, [search]);

    return isLoaded && (
        <main className="search-page">
            <section>
                <div className="primary-border search-head">
                    <h2 className="search-header">Product Name</h2>
                    <span className="search-offer-count">{pagination.count} offers</span>
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
                    {pagination.products.length > 0 ? (
                        <>
                            <SearchResults
                                products={pagination.products}
                            />
                            <SearchPagination
                                pagination={pagination}
                            />
                        </>
                    ) : (
                        <SearchResultsNotFound />
                    )}
                </div>
            </section>
        </main>
    );
}
