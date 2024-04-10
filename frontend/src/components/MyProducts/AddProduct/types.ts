export type NewProductFormData = {
    images: File[];
    name: string;
    description: string;
    amount: string;
    price: string;
}

export type NewProductFormErrors = {
    images: string;
    name: string;
    description: string;
    amount: string;
    price: string;
}
