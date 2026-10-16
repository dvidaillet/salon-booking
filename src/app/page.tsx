
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import Hero from "@/components/home/Hero";
import InteractiveServices from "@/components/home/InteractiveServices";
import AboutSection from "@/components/home/AboutSection";
import Gallery from "@/components/home/Gallery";
import BookingCTA from "@/components/home/BookingCTA";

export default function HomePage() {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <InteractiveServices />
        <AboutSection />
        <Gallery />
        <BookingCTA />
      </main>

      <Footer />
    </>
  );
}
