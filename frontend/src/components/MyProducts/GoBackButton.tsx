import { Link } from 'react-router-dom';
import LeftArrowIcon from '@assets/images/icons/left_arrow_icon.svg';

export default function GoBackButton() {
    return (
        <div className="my-products-header">
            <Link
                to="/my-products"
                className="my-products-header-go-back-button"
            >
                <img
                    src={LeftArrowIcon}
                    width={40}
                    alt="Go back button"
                />
                Go Back
            </Link>
        </div>
    );
}
