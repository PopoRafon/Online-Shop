import type { Product } from '@interfaces/types';
import { useState, useEffect } from 'react';
import DisplayCardsContainer from './DisplayCardsContainer';

export default function Random() {
    const [random, setRandom] = useState<Product[]>([]);

    useEffect(() => {
        fetch('/api/products?count=6', {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setRandom([
                        ...data.success,
                        ...new Array(6 - data.success.length).fill(null)
                    ]);
                } else {
                    setRandom(new Array(6).fill(null));
                }
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
