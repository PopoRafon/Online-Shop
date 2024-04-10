import type { Product } from '@interfaces/types';
import { useState, useEffect } from 'react';
import DisplayCardsContainer from './DisplayCardsContainer';

export default function Bestsellers() {
    const [bestsellers, setBestsellers] = useState<Product[]>([]);

    useEffect(() => {
        fetch('/api/products?count=6', {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setBestsellers([
                        ...data.success,
                        ...new Array(6 - data.success.length).fill(null)
                    ]);
                } else {
                    setBestsellers(new Array(6).fill(null));
                }
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
