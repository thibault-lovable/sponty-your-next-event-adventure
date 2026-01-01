import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  Shuffle,
  Calendar as CalendarIcon,
  MapPin,
  Euro,
  Gift,
  ArrowRight,
  Ticket,
  Clock,
  Check,
} from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import eventsData from "@/data/events.json";
import { toast } from "@/hooks/use-toast";

const MysteryTicket = () => {
  const [budget, setBudget] = useState([50]);
  const [distance, setDistance] = useState([30]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isRevealing, setIsRevealing] = useState(false);
  const [revealedEvent, setRevealedEvent] = useState<typeof eventsData.events[0] | null>(null);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const revealMysteryTicket = () => {
    setIsRevealing(true);
    
    // Filter events based on criteria
    const eligibleEvents = eventsData.events.filter((event) => {
      if (event.price > budget[0]) return false;
      if (selectedCategories.length > 0 && !selectedCategories.includes(event.category)) return false;
      return true;
    });

    setTimeout(() => {
      if (eligibleEvents.length > 0) {
        const randomEvent = eligibleEvents[Math.floor(Math.random() * eligibleEvents.length)];
        setRevealedEvent(randomEvent);
        toast({
          title: "🎉 Billet Mystère révélé !",
          description: `Découvrez votre événement surprise : ${randomEvent.title}`,
        });
      } else {
        toast({
          title: "Aucun événement trouvé",
          description: "Essayez d'élargir vos critères de recherche",
          variant: "destructive",
        });
      }
      setIsRevealing(false);
    }, 2500);
  };

  const resetSelection = () => {
    setRevealedEvent(null);
    setBudget([50]);
    setDistance([30]);
    setSelectedDate(undefined);
    setSelectedCategories([]);
  };

  return (
    <>
      <Helmet>
        <title>Billet Mystère - Sponty</title>
        <meta
          name="description"
          content="Vivez l'inattendu avec le Billet Mystère Sponty. Définissez vos critères et laissez-nous vous surprendre avec un événement unique."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
                <Sparkles className="h-4 w-4 text-primary animate-pulse" />
                <span className="text-sm font-medium">Expérience unique</span>
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
                Le <span className="text-gradient glow-text">Billet Mystère</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Définissez vos préférences et laissez le hasard choisir votre prochaine aventure
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              {!revealedEvent ? (
                <div className="glass-strong rounded-2xl p-8 space-y-8">
                  {/* Budget */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                          <Euro className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-display font-semibold">Budget maximum</h3>
                          <p className="text-sm text-muted-foreground">
                            Combien êtes-vous prêt à dépenser ?
                          </p>
                        </div>
                      </div>
                      <span className="text-2xl font-display font-bold text-gradient">
                        {budget[0]}€
                      </span>
                    </div>
                    <Slider
                      value={budget}
                      onValueChange={setBudget}
                      max={200}
                      min={10}
                      step={5}
                      className="py-4"
                    />
                  </div>

                  {/* Distance */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                          <MapPin className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-display font-semibold">Distance maximale</h3>
                          <p className="text-sm text-muted-foreground">
                            Jusqu'où êtes-vous prêt à vous déplacer ?
                          </p>
                        </div>
                      </div>
                      <span className="text-2xl font-display font-bold text-gradient">
                        {distance[0]} km
                      </span>
                    </div>
                    <Slider
                      value={distance}
                      onValueChange={setDistance}
                      max={100}
                      min={5}
                      step={5}
                      className="py-4"
                    />
                  </div>

                  {/* Date */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                        <CalendarIcon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-display font-semibold">Date préférée</h3>
                        <p className="text-sm text-muted-foreground">
                          Quand êtes-vous disponible ? (optionnel)
                        </p>
                      </div>
                    </div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {selectedDate
                            ? format(selectedDate, "PPP", { locale: fr })
                            : "Sélectionner une date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          locale={fr}
                          disabled={(date) => date < new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Categories */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                        <Ticket className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-display font-semibold">Types d'événements</h3>
                        <p className="text-sm text-muted-foreground">
                          Quels types d'événements vous intéressent ? (optionnel)
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {eventsData.categories.map((category) => (
                        <Badge
                          key={category}
                          variant={selectedCategories.includes(category) ? "default" : "outline"}
                          className={`cursor-pointer transition-all ${
                            selectedCategories.includes(category)
                              ? "bg-primary hover:bg-primary/90"
                              : "hover:bg-primary/20 hover:border-primary"
                          }`}
                          onClick={() => toggleCategory(category)}
                        >
                          {selectedCategories.includes(category) && (
                            <Check className="h-3 w-3 mr-1" />
                          )}
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="pt-6">
                    <Button
                      variant="mystery"
                      size="xl"
                      className="w-full group"
                      onClick={revealMysteryTicket}
                      disabled={isRevealing}
                    >
                      {isRevealing ? (
                        <>
                          <Shuffle className="h-5 w-5 animate-spin" />
                          Recherche en cours...
                        </>
                      ) : (
                        <>
                          <Gift className="h-5 w-5 transition-transform group-hover:scale-110" />
                          Révéler mon Billet Mystère
                          <Sparkles className="h-5 w-5" />
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              ) : (
                /* Revealed Event Card */
                <div className="animate-scale-in">
                  <div className="relative glass-strong rounded-2xl overflow-hidden">
                    {/* Celebration Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-electric-violet/20 to-electric-indigo/10" />
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />

                    <div className="relative p-8 space-y-6">
                      {/* Header */}
                      <div className="text-center space-y-2">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary">
                          <Sparkles className="h-4 w-4" />
                          <span className="font-medium">Votre Billet Mystère</span>
                        </div>
                        <h2 className="font-display text-3xl md:text-4xl font-bold">
                          {revealedEvent.title}
                        </h2>
                        <Badge variant="outline" className="text-primary border-primary/50">
                          {revealedEvent.category}
                        </Badge>
                      </div>

                      {/* Details */}
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="glass rounded-xl p-4 text-center">
                          <CalendarIcon className="h-6 w-6 text-primary mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground">Date</p>
                          <p className="font-semibold">
                            {format(new Date(revealedEvent.date), "d MMMM yyyy", { locale: fr })}
                          </p>
                        </div>
                        <div className="glass rounded-xl p-4 text-center">
                          <Clock className="h-6 w-6 text-primary mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground">Heure</p>
                          <p className="font-semibold">{revealedEvent.time}</p>
                        </div>
                        <div className="glass rounded-xl p-4 text-center">
                          <MapPin className="h-6 w-6 text-primary mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground">Lieu</p>
                          <p className="font-semibold">{revealedEvent.city}</p>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-muted-foreground text-center text-lg">
                        {revealedEvent.description}
                      </p>

                      {/* Price & Actions */}
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-border/50">
                        <div className="text-center sm:text-left">
                          <p className="text-sm text-muted-foreground">Prix du billet</p>
                          <p className="text-3xl font-display font-bold text-gradient">
                            {revealedEvent.price}€
                          </p>
                        </div>
                        <div className="flex gap-3">
                          <Button variant="outline" onClick={resetSelection}>
                            Retenter ma chance
                          </Button>
                          <Button variant="glow" className="group">
                            Réserver maintenant
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default MysteryTicket;
