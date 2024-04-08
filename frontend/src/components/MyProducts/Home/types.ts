export type Product = {
    id: number;
    name: string;
    description: string;
    images: Array<{ image: string }>;
    price: number;
    amount: number;
    sold: number;
}
