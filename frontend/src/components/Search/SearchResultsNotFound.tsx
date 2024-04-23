export default function SearchResultsNotFound() {
    return (
        <div className="search-results-not-found">
            <div className="primary-border search-results-not-found-container">
                <h3 className="search-results-not-found-header">No results were found matching your search.</h3>
                <span className="search-results-not-found-tip">Make sure you're entering the correct name or try one of the solutions below:</span>
                <ul className="search-results-not-found-suggestions">
                    <li>Check your spelling</li>
                    <li>Try using different words in your next search</li>
                    <li>Look for something similar</li>
                </ul>
            </div>
        </div>
    );
}
