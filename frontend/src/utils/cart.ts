import type { AlertData } from '@contexts/AlertContext/AlertContextProvider';
import Cookies from 'js-cookie';

type UpdateCartArgs = {
    productId: string;
    setAlert: React.Dispatch<React.SetStateAction<AlertData>>;
}

async function updateCart({ productId, setAlert }: UpdateCartArgs): Promise<void> {
    const csrfToken: string = Cookies.get('csrftoken') ?? '';

    return await fetch('/api/cart', {
        method: 'PATCH',
        headers: {
            /* eslint-disable @typescript-eslint/naming-convention */
            'X-CSRFToken': csrfToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ product_id: productId })
        /* eslint-enable @typescript-eslint/naming-convention */
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                setAlert({
                    show: true,
                    type: 'success',
                    text: 'Product has been successfully added to your cart.'
                });
            }
        })
        .catch(() => {
            setAlert({
                show: true,
                type: 'error',
                text: 'Product could not be added to your cart.'
            });
        });
}

export { updateCart };
