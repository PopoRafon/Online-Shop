import type { ChangeEvent, FormEvent } from 'react';
import { useState, useRef } from 'react';

export default function SearchBar() {
    const searchbarRef = useRef<null | HTMLFormElement>(null);
    const [searchData, setSearchData] = useState<string>('');

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const { value } = event.target;

        setSearchData(value);
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
    }

    function highlightSearchBar() {
        if (searchbarRef.current) {
            searchbarRef.current.style.outline = '2px solid rgb(105, 165, 255)';
        }
    }

    function blurSearchBar() {
        if (searchbarRef.current) {
            searchbarRef.current.style.outline = '';
        }
    }

    return (
        <form
            ref={searchbarRef}
            noValidate
            autoComplete="off"
            className="navigation-searchbar"
            onSubmit={handleSubmit}
        >
            <input
                type="text"
                name="search"
                className="navigation-searchbar-input"
                placeholder="What are you looking for?"
                value={searchData}
                onChange={handleChange}
                onFocus={highlightSearchBar}
                onBlur={blurSearchBar}
            />
            <input
                id="search"
                type="submit"
                value=""
                className="navigation-searchbar-submit"
            />
        </form>
    );
}
