import Newsletter from './Newsletter';
import PaymentMethods from './PaymentMethods';
import About from './About';

export default function Footer() {
    return (
        <footer>
            <Newsletter />
            <PaymentMethods />
            <About />
        </footer>
    );
}
