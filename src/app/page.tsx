import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import FeaturedServices from "@/components/home/FeaturedServices";
import AboutSection from "@/components/home/AboutSection";
import Gallery from "@/components/home/Gallery";
import Testimonials from "@/components/home/Testimonials";
import BookingCTA from "@/components/home/BookingCTA";

export default function HomePage() {
  return (
    <>
      <Header />

      <main>
        <Hero />

        <FeaturedServices />

        <AboutSection />

        <Gallery />

        <Testimonials />

        <BookingCTA />
      </main>

      <Footer />
    </>
  );
}