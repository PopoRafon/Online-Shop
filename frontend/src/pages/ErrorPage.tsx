import { Link } from 'react-router-dom';
import SadFace from '@assets/images/sad_face.svg';

export default function ErrorPage() {
    return (
        <main className="error-page">
            <img
                src={SadFace}
                alt="Error image"
            />
            <h2 className="error-page-header">OOPS!</h2>
            <span className="error-page-description">We can't find the page you're looking for.</span>
            <Link
                to='/'
                className="error-page-home-button"
            >
                Homepage
            </Link>
        </main>
    );
}
