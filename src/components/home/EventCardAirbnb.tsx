import { useState } from "react";
import { Calendar, MapPin, Heart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  city: string;
  category: string;
  price: number;
  image: string;
  availableTickets: number;
  totalTickets: number;
  featured?: boolean;
}

interface EventCardAirbnbProps {
  event: Event;
}

const EventCardAirbnb = ({ event }: EventCardAirbnbProps) => {
  const [isLiked, setIsLiked] = useState(false);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const availabilityPercent = (event.availableTickets / event.totalTickets) * 100;
  const isLowAvailability = availabilityPercent < 20;

  return (
    <div className="group cursor-pointer">
      {/* Image Container */}
      <div className="relative aspect-square rounded-xl overflow-hidden mb-3 bg-muted">
        {/* Placeholder gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary to-accent flex items-center justify-center">
          <span className="text-4xl opacity-50">🎭</span>
        </div>
        
        {/* Like Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsLiked(!isLiked);
          }}
          className="absolute top-3 right-3 z-10"
        >
          <Heart
            className={`h-6 w-6 transition-all ${
              isLiked
                ? "fill-destructive text-destructive"
                : "text-white drop-shadow-md hover:scale-110"
            }`}
          />
        </button>

        {/* Featured Badge */}
        {event.featured && (
          <div className="absolute top-3 left-3 z-10">
            <span className="bg-background text-foreground text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
              Coup de cœur
            </span>
          </div>
        )}

        {/* Low Availability Badge */}
        {isLowAvailability && (
          <div className="absolute bottom-3 left-3 z-10">
            <span className="bg-destructive text-destructive-foreground text-xs font-medium px-2 py-1 rounded-md">
              Dernières places
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="space-y-1">
        {/* Title & Rating */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-foreground line-clamp-1 group-hover:underline">
            {event.title}
          </h3>
          <div className="flex items-center gap-1 flex-shrink-0">
            <Star className="h-4 w-4 fill-foreground text-foreground" />
            <span className="text-sm font-medium">4.9</span>
          </div>
        </div>

        {/* Category & City */}
        <p className="text-sm text-muted-foreground">
          {event.category} · {event.city}
        </p>

        {/* Date */}
        <p className="text-sm text-muted-foreground">
          {formatDate(event.date)} à {event.time}
        </p>

        {/* Price */}
        <p className="text-sm pt-1">
          <span className="font-semibold text-foreground">{event.price} €</span>
          <span className="text-muted-foreground"> par personne</span>
        </p>
      </div>
    </div>
  );
};

export default EventCardAirbnb;
