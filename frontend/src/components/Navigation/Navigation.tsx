import NavigationHeader from './NavigationHeader';
import SearchBar from './SearchBar';

export default function Navigation() {
    return (
        <header>
            <nav className="primary-border navigation">
                <NavigationHeader />
                <SearchBar />
            </nav>
        </header>
    );
}
