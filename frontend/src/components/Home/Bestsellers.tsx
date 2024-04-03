import type { DisplayCardItem } from './DisplayCardsContainer';
import { useState, useEffect } from 'react';
import DisplayCardsContainer from './DisplayCardsContainer';

export default function Bestsellers() {
    const [bestsellers, setBestsellers] = useState<DisplayCardItem[]>([]);

    useEffect(() => {
        setBestsellers(new Array(6).fill(null));
    }, []);

    return (
        <DisplayCardsContainer
            title="Bestsellers"
            note="Most sold items in last 7 days"
            items={bestsellers}
        />
    );
}
