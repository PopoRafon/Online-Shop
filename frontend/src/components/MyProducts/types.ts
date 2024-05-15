export type ProductFormData = {
    images: File[];
    name: string;
    description: string;
    amount: string;
    category: string;
    price: string;
}

export type ProductFormErrors = {
    images: string;
    name: string;
    description: string;
    amount: string;
    category: string;
    price: string;
}
