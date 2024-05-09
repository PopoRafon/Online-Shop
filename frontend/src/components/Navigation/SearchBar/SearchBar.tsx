import type { ChangeEvent, FormEvent } from 'react';
import type { Product } from '@interfaces/types';
import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getProducts } from '@utils/product';
import SearchBarSuggestions from './SearchBarSuggestions';
import ClearIcon from '@assets/images/icons/clear_icon.svg';

export default function SearchBar() {
    const navigate = useNavigate();
    const searchbarRef = useRef<HTMLFormElement | null>(null);
    const { pathname } = useLocation();
    const [bestsellers, setBestsellers] = useState<Product[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [searchData, setSearchData] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [showResetButton, setShowResetButton] = useState<boolean>(false);
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

    useEffect(() => {
        getProducts({
            amount: 3,
            sort: 'sold-highest-first',
            setProducts: setBestsellers
        });
    }, []);

    useEffect(() => {
        const productsFetchTimeout = setTimeout(() => {
            if (searchData.length >= 2) {
                getProducts({
                    amount: 3,
                    category: category,
                    setProducts: setProducts,
                    name: searchData
                });
            }
        }, 500);

        if (products.length !== 0) {
            setProducts([]);
        }

        return () => clearTimeout(productsFetchTimeout);
    }, [searchData, category]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        const clickEventListener = (event: MouseEvent) => {
            if (searchbarRef.current && !searchbarRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('click', clickEventListener);

        return () => {
            setShowSuggestions(false);
            document.removeEventListener('click', clickEventListener);
        };
    }, [pathname]);

    function handleSearchDataChange(event: ChangeEvent<HTMLInputElement>) {
        const { value } = event.target;

        setSearchData(value);
        setShowResetButton(value.length !== 0);
    }

    function handleCategoryChange(event: ChangeEvent<HTMLSelectElement>) {
        const { value } = event.target;

        setCategory(value);
    }

    function handleReset() {
        setShowResetButton(false);
        setSearchData('');
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        let url: string = `/search?limit=40&name=${searchData}`;

        if (category) {
            url += `&category=${category}`;
        }

        navigate(url);
    }

    return (
        <form
            noValidate
            autoComplete="off"
            className="navigation-searchbar"
            aria-label="Search form"
            onSubmit={handleSubmit}
            ref={searchbarRef}
        >
            <label className="navigation-searchbar-input-label">
                <input
                    type="text"
                    name="search"
                    className="navigation-searchbar-input"
                    placeholder="What are you looking for?"
                    value={searchData}
                    onChange={handleSearchDataChange}
                    onFocus={() => setShowSuggestions(true)}
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
            </label>
            <select
                name="category"
                className="navigation-searchbar-categories"
                onChange={handleCategoryChange}
            >
                <option value="">All categories</option>
                <option value="electronics">Electronics</option>
                <option value="children">Children</option>
                <option value="art">Art</option>
                <option value="health">Health</option>
                <option value="entertainment">Entertainment</option>
                <option value="automotive">Automotive</option>
            </select>
            {showSuggestions && (
                searchData.length >= 2 ? (
                    <SearchBarSuggestions
                        headerText="Found products"
                        products={products}
                    />
                ) : (
                    <SearchBarSuggestions
                        headerText="Bestsellers"
                        products={bestsellers}
                    />
                )
            )}
            <input
                type="submit"
                value=""
                className="primary-button navigation-searchbar-submit"
            />
        </form>
    );
}
