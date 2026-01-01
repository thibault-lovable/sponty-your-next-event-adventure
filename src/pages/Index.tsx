import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import SearchBar from "@/components/home/SearchBar";
import CategoryBar from "@/components/home/CategoryBar";
import EventCardAirbnb from "@/components/home/EventCardAirbnb";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import eventsData from "@/data/events.json";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchFilters, setSearchFilters] = useState({
    search: "",
    city: "",
    dateRange: "",
  });

  const filteredEvents = useMemo(() => {
    return eventsData.events.filter((event) => {
      // Search filter
      if (searchFilters.search) {
        const searchLower = searchFilters.search.toLowerCase();
        const matchesSearch =
          event.title.toLowerCase().includes(searchLower) ||
          event.description.toLowerCase().includes(searchLower) ||
          event.location.toLowerCase().includes(searchLower) ||
          event.category.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      // City filter
      if (searchFilters.city) {
        const cityLower = searchFilters.city.toLowerCase();
        if (!event.city.toLowerCase().includes(cityLower)) return false;
      }

      // Category filter
      if (selectedCategory && event.category !== selectedCategory) {
        return false;
      }

      return true;
    });
  }, [searchFilters, selectedCategory]);

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
        
        {/* Search Header */}
        <div className="bg-background border-b border-border py-6">
          <div className="container mx-auto px-4 md:px-6">
            <SearchBar onSearch={setSearchFilters} />
          </div>
        </div>

        {/* Category Bar */}
        <CategoryBar
          categories={eventsData.categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {/* Mystery Ticket Banner */}
        <div className="container mx-auto px-4 md:px-6 py-6">
          <Link to="/mystery">
            <div className="bg-gradient-to-r from-primary/10 via-accent to-primary/10 border border-primary/20 rounded-xl p-6 hover:shadow-lg transition-all cursor-pointer group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Tentez le Billet Mystère</h3>
                    <p className="text-sm text-muted-foreground">
                      Laissez le hasard choisir votre prochaine aventure
                    </p>
                  </div>
                </div>
                <Button variant="outline" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  Découvrir
                </Button>
              </div>
            </div>
          </Link>
        </div>

        {/* Events Grid */}
        <main className="container mx-auto px-4 md:px-6 py-6">
          {/* Results Info */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{filteredEvents.length}</span>{" "}
              événement{filteredEvents.length !== 1 ? "s" : ""} disponible{filteredEvents.length !== 1 ? "s" : ""}
            </p>
          </div>

          {/* Grid */}
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {filteredEvents.map((event) => (
                <EventCardAirbnb key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🎭</div>
              <h3 className="font-display text-xl font-semibold mb-2">
                Aucun événement trouvé
              </h3>
              <p className="text-muted-foreground">
                Essayez de modifier vos critères de recherche
              </p>
            </div>
          )}
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Index;
