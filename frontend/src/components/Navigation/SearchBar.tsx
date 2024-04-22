import type { ChangeEvent, FormEvent } from 'react';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ClearIcon from '@assets/images/icons/clear_icon.svg';

export default function SearchBar() {
    const navigate = useNavigate();
    const searchBarRef = useRef<null | HTMLFormElement>(null);
    const [searchData, setSearchData] = useState<string>('');
    const [showResetButton, setShowResetButton] = useState<boolean>(false);

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const { value } = event.target;

        setSearchData(value);
        setShowResetButton(value.length !== 0);
    }

    function handleReset() {
        setShowResetButton(false);
        setSearchData('');
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        navigate(`/search?limit=40&name=${searchData}`);
    }

    function highlightSearchBar() {
        if (searchBarRef.current) {
            searchBarRef.current.style.outline = '2px solid rgb(105, 165, 255)';
        }
    }

    function blurSearchBar() {
        if (searchBarRef.current) {
            searchBarRef.current.style.outline = '';
        }
    }

    return (
        <form
            ref={searchBarRef}
            noValidate
            autoComplete="off"
            className="navigation-searchbar"
            aria-label="Search form"
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
            {showResetButton && (
                <label className="navigation-searchbar-reset-button-label">
                    <img
                        src={ClearIcon}
                        height={22}
                        alt="Reset search text"
                    />
                    <input
                        type="reset"
                        onClick={handleReset}
                        className="navigation-searchbar-reset-button-input"
                        value=""
                    />
                </label>
            )}
            <input
                type="submit"
                value=""
                className="primary-button navigation-searchbar-submit"
            />
        </form>
    );
}
