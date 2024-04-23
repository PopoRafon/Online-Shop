import type { Product } from '@interfaces/types';
import { useState, useEffect } from 'react';
import { getProducts } from '@utils/product';
import DisplayCardsContainer from './DisplayCardsContainer';

export default function Recommendations() {
    const [recommendations, setRecommendations] = useState<Product[]>(new Array(3).fill(null));

    useEffect(() => {
        getProducts({
            amount: 3,
            setProducts: setRecommendations
        });
    }, []);

    return (
        <DisplayCardsContainer
            title="Recommendations"
            note="Recommended items based on your preferences"
            products={recommendations}
        />
    );
}
