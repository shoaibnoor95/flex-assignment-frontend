import Header from "../components/Header";
import HeroSearch from "../components/HeroSearch";
import FeaturedProperties from "../components/FeaturedProperties";
import InfoSection from "../components/InfoSection";
import Footer from "../components/Footer";

export default function HomePage() {
    return (
        <div className="font-sans bg-brand-bg text-brand-body">
            <Header />
            <HeroSearch />
            <FeaturedProperties />
            <InfoSection />
            <Footer />
        </div>
    );
}
