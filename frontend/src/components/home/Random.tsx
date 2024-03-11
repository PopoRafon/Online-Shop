import type { DisplayCardItem } from './DisplayCardsContainer';
import { useState, useEffect } from 'react';
import DisplayCardsContainer from './DisplayCardsContainer';

export default function Random() {
    const [random, setRandom] = useState<DisplayCardItem[]>([]);

    useEffect(() => {
        setRandom(new Array(6).fill(null));
    }, []);

    return (
        <DisplayCardsContainer
            header="Random"
            note="Random items that may interest you"
            items={random}
        />
    );
}
