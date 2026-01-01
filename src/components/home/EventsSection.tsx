import { useState, useMemo } from "react";
import EventCard from "./EventCard";
import EventFilters, { FilterState } from "./EventFilters";
import eventsData from "@/data/events.json";

const EventsSection = () => {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    category: "",
    city: "",
    maxPrice: 200,
    dateRange: "",
  });

  const filteredEvents = useMemo(() => {
    return eventsData.events.filter((event) => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch =
          event.title.toLowerCase().includes(searchLower) ||
          event.description.toLowerCase().includes(searchLower) ||
          event.location.toLowerCase().includes(searchLower) ||
          event.category.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      // Category filter
      if (filters.category && event.category !== filters.category) {
        return false;
      }

      // City filter
      if (filters.city && event.city !== filters.city) {
        return false;
      }

      // Price filter
      if (event.price > filters.maxPrice) {
        return false;
      }

      // Date filter
      if (filters.dateRange) {
        const eventDate = new Date(event.date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        switch (filters.dateRange) {
          case "today":
            if (eventDate.toDateString() !== today.toDateString()) return false;
            break;
          case "week": {
            const weekFromNow = new Date(today);
            weekFromNow.setDate(weekFromNow.getDate() + 7);
            if (eventDate < today || eventDate > weekFromNow) return false;
            break;
          }
          case "month": {
            const monthFromNow = new Date(today);
            monthFromNow.setMonth(monthFromNow.getMonth() + 1);
            if (eventDate < today || eventDate > monthFromNow) return false;
            break;
          }
          case "next-month": {
            const nextMonthStart = new Date(today);
            nextMonthStart.setMonth(nextMonthStart.getMonth() + 1);
            const nextMonthEnd = new Date(nextMonthStart);
            nextMonthEnd.setMonth(nextMonthEnd.getMonth() + 1);
            if (eventDate < nextMonthStart || eventDate > nextMonthEnd) return false;
            break;
          }
        }
      }

      return true;
    });
  }, [filters]);

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Événements à venir
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Découvrez notre sélection d'événements exceptionnels près de chez vous
          </p>
        </div>

        {/* Filters */}
        <div className="mb-10">
          <EventFilters
            categories={eventsData.categories}
            cities={eventsData.cities}
            onFiltersChange={setFilters}
          />
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            <span className="text-foreground font-semibold">{filteredEvents.length}</span>{" "}
            événement{filteredEvents.length !== 1 ? "s" : ""} trouvé{filteredEvents.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredEvents.map((event, index) => (
              <EventCard key={event.id} event={event} index={index} />
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
      </div>
    </section>
  );
};

export default EventsSection;
