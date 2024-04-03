import type { DisplayCardItem } from './DisplayCardsContainer';
import { useState, useEffect } from 'react';
import DisplayCardsContainer from './DisplayCardsContainer';

export default function Recommendations() {
    const [recommendations, setRecommendations] = useState<DisplayCardItem[]>([]);

    useEffect(() => {
        setRecommendations(new Array(3).fill(null));
    }, []);

    return (
        <DisplayCardsContainer
            title="Recommendations"
            note="Recommended items based on your preferences"
            items={recommendations}
        />
    );
}
