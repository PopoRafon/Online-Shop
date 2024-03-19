import Footer from '@components/Footer/Footer';
import Recommendations from '@components/Home/Recommendations';
import Bestsellers from '@components/Home/Bestsellers';
import Random from '@components/Home/Random';

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
