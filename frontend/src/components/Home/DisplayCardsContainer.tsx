import { Link } from 'react-router-dom';

export type DisplayCardItem = {
    image: string;
    url: string;
    name: string;
    price: number;
}

type DisplayCardsContainerProps = {
    header: string;
    note: string;
    items: DisplayCardItem[];
}

export default function DisplayCardsContainer({ header, note, items }: DisplayCardsContainerProps) {
    return (
        <section className="home-display-cards-container">
            <h2 className="home-display-cards-container-header">{header}</h2>
            <span className="home-display-cards-container-note">{note}</span>
            <div className="home-display-cards-container-body">
                {items.map((item, index) => (
                    item ? (
                        <Link
                            to={item.url}
                            className="display-card"
                            key={index}
                        >
                            <img
                                className="display-card-cover"
                                src={item.image}
                            />
                            <div className="display-card-description">
                                <span className="display-card-name">{item.name}</span>
                                <span className="display-card-price">{item.price} $</span>
                            </div>
                        </Link>
                    ) : (
                        <div className="display-card" key={index}></div>
                    )
                ))}
            </div>
        </section>
    );
}
