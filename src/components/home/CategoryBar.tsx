import { useState } from "react";
import { 
  Music, 
  Mic2, 
  Palette, 
  Utensils, 
  Trophy, 
  Theater, 
  Presentation,
  PartyPopper,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface CategoryBarProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Music: Music,
  Comedy: Mic2,
  Art: Palette,
  Food: Utensils,
  Sports: Trophy,
  Theater: Theater,
  Conference: Presentation,
  Festival: PartyPopper,
};

const CategoryBar = ({ categories, selectedCategory, onCategoryChange }: CategoryBarProps) => {
  return (
    <div className="border-b border-border bg-background sticky top-20 z-40">
      <div className="container mx-auto px-4 md:px-6">
        <ScrollArea className="w-full">
          <div className="flex items-center gap-8 py-4">
            {/* All Events */}
            <button
              onClick={() => onCategoryChange("")}
              className={`flex flex-col items-center gap-2 min-w-fit pb-2 border-b-2 transition-all ${
                selectedCategory === ""
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground/30"
              }`}
            >
              <Sparkles className="h-6 w-6" />
              <span className="text-xs font-medium whitespace-nowrap">Tous</span>
            </button>

            {categories.map((category) => {
              const Icon = categoryIcons[category] || Sparkles;
              const isActive = selectedCategory === category;
              
              return (
                <button
                  key={category}
                  onClick={() => onCategoryChange(category)}
                  className={`flex flex-col items-center gap-2 min-w-fit pb-2 border-b-2 transition-all ${
                    isActive
                      ? "border-foreground text-foreground"
                      : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground/30"
                  }`}
                >
                  <Icon className="h-6 w-6" />
                  <span className="text-xs font-medium whitespace-nowrap">{category}</span>
                </button>
              );
            })}
          </div>
          <ScrollBar orientation="horizontal" className="invisible" />
        </ScrollArea>
      </div>
    </div>
  );
};

export default CategoryBar;
