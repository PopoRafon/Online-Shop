export type Product = {
    id: string;
    name: string;
    description: string;
    images: Array<{ image: string }>;
    price: number;
    amount: number;
    sold: number;
}
