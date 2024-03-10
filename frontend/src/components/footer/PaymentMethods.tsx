import VisaIcon from '@assets/images/icons/payment_methods/visa_icon.svg';
import MastercardIcon from '@assets/images/icons/payment_methods/mastercard_icon.svg';
import DiscoverIcon from '@assets/images/icons/payment_methods/discover_icon.svg';
import PaypalIcon from '@assets/images/icons/payment_methods/paypal_icon.svg';
import StripeIcon from '@assets/images/icons/payment_methods/stripe_icon.svg';

export default function PaymentMethods() {
    return (
        <div className="footer-payment-methods">
            <h4 className="footer-payment-methods-header">Payment Methods</h4>
            <div className="footer-payment-methods-body">
                <img
                    src={VisaIcon}
                    alt="Visa icon"
                />
                <img
                    src={MastercardIcon}
                    alt="Mastercard icon"
                />
                <img
                    src={DiscoverIcon}
                    alt="Discover icon"
                />
                <img
                    src={PaypalIcon}
                    alt="Paypal icon"
                />
                <img
                    src={StripeIcon}
                    alt="Stripe icon"
                />
                <span className="footer-payment-methods-body-text">and more...</span>
            </div>
        </div>
    );
}
