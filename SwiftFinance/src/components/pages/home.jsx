import HeroSection from "../views/homeviews/HeroSection";
import Featured from "../views/homeviews/featured";
import Faqs from "../views/homeviews/Faqs";

const Home = () => {
  return (
    <main style={{ padding: 0, background: "transparent" }}>
      {/* Standard Landing Page Views */}
      <HeroSection />
      <Featured />
      <Faqs />
    </main>
  );
};

export default Home;