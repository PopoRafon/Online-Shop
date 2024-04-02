import { Link } from 'react-router-dom';
import SadFace from '@assets/images/sad_face.svg';

export default function Error() {
    return (
        <main className="error-page">
            <img
                src={SadFace}
                alt="Error image"
            />
            <h2 className="error-header">OOPS!</h2>
            <span className="error-description">We can't find the page you're looking for.</span>
            <Link
                to='/'
                className="error-home-button"
            >
                Homepage
            </Link>
        </main>
    );
}
