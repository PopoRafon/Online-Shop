import type { Product } from '@interfaces/types';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import LeftArrowHeadIcon from '@assets/images/icons/left_arrowhead_icon.svg';
import RightArrowHeadIcon from '@assets/images/icons/right_arrowhead_icon.svg';

type ProductContainerProps = {
    product: Product
}

export default function ProductContainer({ product }: ProductContainerProps) {
    const starsRef = useRef<number>(product.ratings.reduce((previous, current) => previous + current, 0) / (product.ratings.length * 5) * 5);
    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const [showBackButton, setShowBackButton] = useState<boolean>(false);
    const [showNextButton, setShowNextButton] = useState<boolean>(false);

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
                    <span>{starsRef.current.toFixed(2)}</span>
                    <div className="product-header-stars product-header-gray-stars">
                        <div
                            className="product-header-stars product-header-yellow-stars"
                            style={{ width: `${21 * starsRef.current}px` }}
                        ></div>
                    </div>
                    <Link
                        to='/'
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
