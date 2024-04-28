import type { Product } from '@interfaces/types';
import type { ChangeEvent } from 'react';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
    const navigate = useNavigate();
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

    function handleSorting(event: ChangeEvent<HTMLSelectElement>) {
        const { value } = event.target;
        const name: string[] | null = search.match(/name=([^&]*)/);

        navigate(`/search?limit=40&name=${name ? name[1] : ''}&sort=${value}`);
    }

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
                        <select
                            onChange={handleSorting}
                            className="primary-border search-sorting-selection"
                        >
                            <option value="">Accurate</option>
                            <option value="newest-first">Date</option>
                            <option value="price-highest-first">Price: from highest</option>
                            <option value="price-lowest-first">Price: from lowest</option>
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
