import type { Product } from '@interfaces/types';
import { useState, useEffect } from 'react';
import { getProducts } from '@utils/product';
import DisplayCardsContainer from './DisplayCardsContainer';

export default function Bestsellers() {
    const [bestsellers, setBestsellers] = useState<Product[]>(new Array(6).fill(null));

    useEffect(() => {
        getProducts({
            amount: 6,
            sort: 'sold-highest-first',
            setProducts: setBestsellers
        });
    }, []);

    return (
        <DisplayCardsContainer
            title="Bestsellers"
            note="Most sold items in last 7 days"
            products={bestsellers}
        />
    );
}
