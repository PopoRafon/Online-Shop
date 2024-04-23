import type { Product } from '@interfaces/types';
import { useState, useEffect } from 'react';
import { getProducts } from '@utils/product';
import DisplayCardsContainer from './DisplayCardsContainer';

export default function Random() {
    const [random, setRandom] = useState<Product[]>(new Array(6).fill(null));

    useEffect(() => {
        getProducts({
            amount: 6,
            setProducts: setRandom
        });
    }, []);

    return (
        <DisplayCardsContainer
            title="Random"
            note="Random items that may interest you"
            products={random}
        />
    );
}
