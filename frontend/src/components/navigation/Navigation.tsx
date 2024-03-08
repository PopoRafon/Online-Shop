import NavigationHeader from './NavigationHeader';
import SearchBar from './SearchBar';

export default function Navigation() {
    return (
        <nav className="navigation">
            <NavigationHeader />
            <SearchBar />
        </nav>
    );
}
