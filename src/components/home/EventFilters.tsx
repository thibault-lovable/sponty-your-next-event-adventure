import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Search, SlidersHorizontal, X } from "lucide-react";

interface EventFiltersProps {
  categories: string[];
  cities: string[];
  onFiltersChange: (filters: FilterState) => void;
}

export interface FilterState {
  search: string;
  category: string;
  city: string;
  maxPrice: number;
  dateRange: string;
}

const EventFilters = ({ categories, cities, onFiltersChange }: EventFiltersProps) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    category: "",
    city: "",
    maxPrice: 200,
    dateRange: "",
  });

  const updateFilter = (key: keyof FilterState, value: string | number) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    const defaultFilters: FilterState = {
      search: "",
      category: "",
      city: "",
      maxPrice: 200,
      dateRange: "",
    };
    setFilters(defaultFilters);
    onFiltersChange(defaultFilters);
  };

  const hasActiveFilters = 
    filters.search || 
    filters.category || 
    filters.city || 
    filters.maxPrice < 200 || 
    filters.dateRange;

  return (
    <div className="space-y-4">
      {/* Main Search Bar */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Rechercher un événement, artiste, lieu..."
            className="pl-12 h-12 bg-card border-border/50 focus:border-primary/50 text-base"
            value={filters.search}
            onChange={(e) => updateFilter("search", e.target.value)}
          />
        </div>
        <Button
          variant={showAdvanced ? "secondary" : "outline"}
          size="lg"
          className="gap-2"
          onClick={() => setShowAdvanced(!showAdvanced)}
        >
          <SlidersHorizontal className="h-5 w-5" />
          <span className="hidden sm:inline">Filtres</span>
        </Button>
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="glass rounded-xl p-6 space-y-6 animate-scale-in">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold">Filtres avancés</h3>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground gap-1"
                onClick={clearFilters}
              >
                <X className="h-4 w-4" />
                Effacer
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Category */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                Catégorie
              </label>
              <Select
                value={filters.category}
                onValueChange={(value) => updateFilter("category", value)}
              >
                <SelectTrigger className="bg-secondary border-border/50">
                  <SelectValue placeholder="Toutes les catégories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Toutes les catégories</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* City */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                Ville
              </label>
              <Select
                value={filters.city}
                onValueChange={(value) => updateFilter("city", value)}
              >
                <SelectTrigger className="bg-secondary border-border/50">
                  <SelectValue placeholder="Toutes les villes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Toutes les villes</SelectItem>
                  {cities.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Date Range */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                Période
              </label>
              <Select
                value={filters.dateRange}
                onValueChange={(value) => updateFilter("dateRange", value)}
              >
                <SelectTrigger className="bg-secondary border-border/50">
                  <SelectValue placeholder="Toutes les dates" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Toutes les dates</SelectItem>
                  <SelectItem value="today">Aujourd'hui</SelectItem>
                  <SelectItem value="week">Cette semaine</SelectItem>
                  <SelectItem value="month">Ce mois</SelectItem>
                  <SelectItem value="next-month">Mois prochain</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Price Range */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                Prix max: {filters.maxPrice}€
              </label>
              <Slider
                value={[filters.maxPrice]}
                onValueChange={([value]) => updateFilter("maxPrice", value)}
                max={200}
                min={0}
                step={10}
                className="py-4"
              />
            </div>
          </div>
        </div>
      )}

      {/* Quick Category Pills */}
      <div className="flex flex-wrap gap-2">
        {categories.slice(0, 6).map((cat) => (
          <Button
            key={cat}
            variant={filters.category === cat ? "secondary" : "glass"}
            size="sm"
            onClick={() => updateFilter("category", filters.category === cat ? "" : cat)}
            className={filters.category === cat ? "bg-primary/20 text-primary border-primary/30" : ""}
          >
            {cat}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default EventFilters;
