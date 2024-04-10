import type { Product } from '@interfaces/types';
import { useState, useEffect } from 'react';
import DisplayCardsContainer from './DisplayCardsContainer';

export default function Recommendations() {
    const [recommendations, setRecommendations] = useState<Product[]>([]);

    useEffect(() => {
        fetch('/api/products?count=3', {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setRecommendations([
                        ...data.success,
                        ...new Array(3 - data.success.length).fill(null)
                    ]);
                } else {
                    setRecommendations(new Array(3).fill(null));
                }
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
