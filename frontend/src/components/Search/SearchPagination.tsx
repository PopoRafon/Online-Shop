import type { SearchResultsPagination } from '@pages/Search';
import { useNavigate } from 'react-router-dom';

type SearchPaginationProps = {
    pagination: SearchResultsPagination;
}

export default function SearchPagination({ pagination }: SearchPaginationProps) {
    const navigate = useNavigate();

    function handleClick(url: string) {
        return () => {
            const queryString = url.split('?')[1];

            navigate(`/search?${queryString}`);
        };
    }

    return (
        <div className="primary-border search-pagination-container">
            <span className="search-pagination-products-count">{pagination.products.length} from {pagination.count} products</span>
            <div>
                {pagination.previous && (
                    <button
                        onClick={handleClick(pagination.previous)}
                        className="search-pagination-button"
                    >
                        Previous
                    </button>
                )}
                <span className="search-pagination-current-page">1 of {Math.ceil(pagination.count / 40)}</span>
                {pagination.next && (
                    <button
                        onClick={handleClick(pagination.next)}
                        className="search-pagination-button"
                    >
                        Next
                    </button>
                )}
            </div>
        </div>
    );
}
