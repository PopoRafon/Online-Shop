import Footer from '@components/footer/Footer';
import Recommendations from '@components/home/Recommendations';
import Bestsellers from '@components/home/Bestsellers';
import Random from '@components/home/Random';

export default function Home() {
    return (
        <>
            <main className="home-page">
                <Recommendations />
                <Bestsellers />
                <Random />
            </main>
            <Footer />
        </>
    );
}
