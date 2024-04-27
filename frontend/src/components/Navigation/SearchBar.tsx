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
    const [showResetButton, setShowResetButton] = useState<boolean>(false);
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

    useEffect(() => {
        getProducts({
            amount: 3,
            setProducts: setBestsellers
        });
    }, []);

    useEffect(() => {
        const productsFetchTimeout = setTimeout(() => {
            if (searchData.length >= 2) {
                getProducts({
                    amount: 3,
                    setProducts: setProducts,
                    name: searchData
                });
            }
        }, 500);

        if (products.length !== 0) {
            setProducts([]);
        }

        return () => clearTimeout(productsFetchTimeout);
    }, [searchData]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        const clickListener = (event: MouseEvent) => {
            if (searchbarRef.current && !searchbarRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('click', clickListener);

        return () => {
            setShowSuggestions(false);
            document.removeEventListener('click', clickListener);
        };
    }, [pathname]);

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
                    onChange={handleChange}
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
