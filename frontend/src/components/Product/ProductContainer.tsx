import type { Product } from '@interfaces/types';
import type { MouseEvent } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { createRating } from '@utils/rating';
import useUserContext from '@contexts/UserContext/useUserContext';
import useAlertContext from '@contexts/AlertContext/useAlertContext';
import LeftArrowHeadIcon from '@assets/images/icons/left_arrowhead_icon.svg';
import RightArrowHeadIcon from '@assets/images/icons/right_arrowhead_icon.svg';

type ProductContainerProps = {
    product: Product;
    setProduct: React.Dispatch<React.SetStateAction<Product>>;
}

export default function ProductContainer({ product, setProduct }: ProductContainerProps) {
    const { user } = useUserContext();
    const { setAlert } = useAlertContext();
    const [stars, setStars] = useState<number>(product.ratings.reduce((previous, current) => previous + current, 0) / product.ratings.length);
    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const [showBackButton, setShowBackButton] = useState<boolean>(false);
    const [showNextButton, setShowNextButton] = useState<boolean>(false);

    function handleRating(event: MouseEvent<HTMLButtonElement>) {
        if (user.isLoggedIn) {
            const { x } = event.currentTarget.getBoundingClientRect();
            const rating: number = Math.floor((event.clientX - x) / 20) + 1;

            createRating({
                productId: product.id,
                rating,
                setAlert,
                product,
                setProduct,
                setStars
            });
        }
    }

    function handleSlideshowMouseLeave() {
        setShowBackButton(false);
        setShowNextButton(false);
    }

    function handleSlideshowMouseEnter() {
        setShowBackButton(currentSlide !== 0);
        setShowNextButton(currentSlide !== (product.images.length - 1));
    }

    function handleSlideChange(index: number) {
        return () => {
            setShowBackButton(index !== 0);
            setShowNextButton(index < (product.images.length - 1));
            setCurrentSlide(index);
        };
    }

    return (
        <section className="primary-border product-container">
            <div className="product-header">
                <h2 className="product-header-name">{product.name}</h2>
                <div className="product-header-rating">
                    <span>{stars ? stars.toFixed(2) : 0}</span>
                    <button
                        className="product-header-stars product-header-gray-stars"
                        style={{ cursor: user.isLoggedIn ? 'pointer' : 'auto' }}
                        onClick={handleRating}
                    >
                        <div
                            className="product-header-stars product-header-yellow-stars"
                            style={{ width: `${20 * stars}px` }}
                        ></div>
                    </button>
                    <Link
                        to={`/product/${product.id}/reviews`}
                    >
                        {product.ratings.length} ratings and {product.reviews} reviews
                    </Link>
                </div>
            </div>
            <div className="product-body">
                <div
                    className="product-slideshow-container"
                    onMouseEnter={handleSlideshowMouseEnter}
                    onMouseLeave={handleSlideshowMouseLeave}
                >
                    {showBackButton && (
                        <button
                            onClick={handleSlideChange(currentSlide - 1)}
                            className="product-slideshow-change-button"
                            style={{ left: '4px' }}
                        >
                            <img
                                src={LeftArrowHeadIcon}
                                height={15}
                                width={15}
                                alt="Previous slide button"
                            />
                        </button>
                    )}
                    <div
                        className="product-slideshow-image-buttons-container"
                        style={{ transform: `translateX(-${currentSlide * (100 / product.images.length)}%)` }}
                    >
                        {product.images.map(image => (
                            <button
                                className="product-slideshow-image-button"
                                key={image}
                            >
                                <img
                                    src={image}
                                    className="product-slideshow-image"
                                    alt="Product image"
                                />
                            </button>
                        ))}
                    </div>
                    {showNextButton && (
                        <button
                            onClick={handleSlideChange(currentSlide + 1)}
                            className="product-slideshow-change-button"
                            style={{ right: '4px' }}
                        >
                            <img
                                src={RightArrowHeadIcon}
                                height={15}
                                width={15}
                                alt="Next slide button"
                            />
                        </button>
                    )}
                </div>
                <div className="custom-scrollbar product-slideshow-all-images-container">
                    {product.images.map((image, index) => (
                        <button
                            className="product-slideshow-all-images-container-button"
                            onClick={() => setCurrentSlide(index)}
                            key={image}
                        >
                            <img
                                src={image}
                                width={60}
                                height={60}
                                alt="Product image"
                            />
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}
