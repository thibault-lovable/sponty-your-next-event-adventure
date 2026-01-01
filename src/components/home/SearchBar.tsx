import { useState } from "react";
import { Search, MapPin, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  onSearch: (filters: { search: string; city: string; dateRange: string }) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [dateRange, setDateRange] = useState("");

  const handleSearch = () => {
    onSearch({ search, city, dateRange });
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-background border border-border rounded-full shadow-lg hover:shadow-xl transition-shadow">
        <div className="flex items-center">
          {/* Destination */}
          <div className="flex-1 px-6 py-4 border-r border-border hover:bg-secondary/50 rounded-l-full cursor-pointer transition-colors">
            <label className="block text-xs font-semibold text-foreground mb-1">
              Événement
            </label>
            <input
              type="text"
              placeholder="Rechercher un événement..."
              className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Location */}
          <div className="flex-1 px-6 py-4 border-r border-border hover:bg-secondary/50 cursor-pointer transition-colors hidden md:block">
            <label className="block text-xs font-semibold text-foreground mb-1">
              Lieu
            </label>
            <input
              type="text"
              placeholder="Où ?"
              className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          {/* Date */}
          <div className="flex-1 px-6 py-4 hover:bg-secondary/50 cursor-pointer transition-colors hidden lg:block">
            <label className="block text-xs font-semibold text-foreground mb-1">
              Quand
            </label>
            <input
              type="text"
              placeholder="Ajouter des dates"
              className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            />
          </div>

          {/* Search Button */}
          <div className="px-2 py-2">
            <Button
              onClick={handleSearch}
              className="rounded-full h-12 w-12 bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
