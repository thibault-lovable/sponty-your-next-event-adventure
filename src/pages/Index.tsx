import { Helmet } from "react-helmet-async";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/home/HeroSection";
import EventsSection from "@/components/home/EventsSection";
import MysteryTicketPreview from "@/components/home/MysteryTicketPreview";
import Footer from "@/components/layout/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Sponty - Billetterie événementielle & Billets Mystères</title>
        <meta
          name="description"
          content="Découvrez Sponty, la plateforme de billetterie innovante. Réservez des événements ou tentez l'expérience unique du Billet Mystère pour vivre l'inattendu."
        />
        <meta
          name="keywords"
          content="billetterie, événements, concerts, spectacles, billet mystère, réservation"
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <HeroSection />
          <MysteryTicketPreview />
          <EventsSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
