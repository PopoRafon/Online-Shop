export type RegisterFormData = {
    email: string;
    username: string;
    password1: string;
    password2: string;
    rules: boolean;
}

export type RegisterFormErrors = {
    email: string;
    username: string;
    password1: string;
    password2: string;
    rules: string;
}
