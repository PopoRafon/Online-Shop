import NavigationHeader from './NavigationHeader';
import SearchBar from './SearchBar';

export default function Navigation() {
    return (
        <header>
            <nav>
                <NavigationHeader />
                <SearchBar />
            </nav>
        </header>
    );
}
