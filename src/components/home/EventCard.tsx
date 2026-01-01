import { Calendar, MapPin, Users, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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

interface EventCardProps {
  event: Event;
  index: number;
}

const categoryColors: Record<string, string> = {
  Music: "bg-electric-violet/20 text-electric-violet border-electric-violet/30",
  Comedy: "bg-warning/20 text-warning border-warning/30",
  Conference: "bg-electric-indigo/20 text-electric-indigo border-electric-indigo/30",
  Art: "bg-electric-pink/20 text-electric-pink border-electric-pink/30",
  Food: "bg-success/20 text-success border-success/30",
  Sports: "bg-destructive/20 text-destructive border-destructive/30",
  Theater: "bg-primary/20 text-primary border-primary/30",
};

const EventCard = ({ event, index }: EventCardProps) => {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
    });
  };

  const availabilityPercent = (event.availableTickets / event.totalTickets) * 100;
  const isLowAvailability = availabilityPercent < 20;

  return (
    <div
      className="group relative rounded-xl overflow-hidden card-gradient border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-[0_0_40px_hsl(var(--electric-violet)/0.15)] animate-fade-in"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Featured Badge */}
      {event.featured && (
        <div className="absolute top-4 right-4 z-10">
          <Badge className="bg-primary/90 text-primary-foreground border-none">
            ⭐ Featured
          </Badge>
        </div>
      )}

      {/* Image Area */}
      <div className="relative h-48 bg-gradient-to-br from-secondary to-muted overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent z-10" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Ticket className="h-20 w-20 text-primary/20 transition-transform group-hover:scale-110 group-hover:rotate-12" />
        </div>
        {/* Date Badge */}
        <div className="absolute top-4 left-4 z-10 glass rounded-lg px-3 py-2 text-center">
          <div className="font-display text-lg font-bold text-foreground">
            {formatDate(event.date).split(" ")[0]}
          </div>
          <div className="text-xs uppercase text-muted-foreground">
            {formatDate(event.date).split(" ")[1]}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Category */}
        <Badge
          variant="outline"
          className={`mb-3 ${categoryColors[event.category] || "bg-muted text-muted-foreground"}`}
        >
          {event.category}
        </Badge>

        {/* Title */}
        <h3 className="font-display text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors line-clamp-1">
          {event.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {event.description}
        </p>

        {/* Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 text-primary" />
            <span>
              {formatDate(event.date)} à {event.time}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="line-clamp-1">{event.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Users className="h-4 w-4 text-primary" />
            <span className={isLowAvailability ? "text-destructive" : "text-muted-foreground"}>
              {isLowAvailability ? "Dernières places !" : `${event.availableTickets} places disponibles`}
            </span>
          </div>
        </div>

        {/* Availability Bar */}
        <div className="mb-4">
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                isLowAvailability
                  ? "bg-gradient-to-r from-destructive to-warning"
                  : "bg-gradient-to-r from-primary to-electric-indigo"
              }`}
              style={{ width: `${100 - availabilityPercent}%` }}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-display font-bold text-gradient">
              {event.price}€
            </span>
          </div>
          <Button variant="glow" size="sm">
            Réserver
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
