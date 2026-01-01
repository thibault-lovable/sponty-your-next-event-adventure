import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Ticket, Menu, X, User, Globe } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Ticket className="h-8 w-8 text-primary transition-transform group-hover:rotate-12" />
            </div>
            <span className="font-display text-2xl font-bold text-primary">
              Sponty
            </span>
          </Link>

          {/* Desktop Navigation - Center */}
          <div className="hidden md:flex items-center gap-1">
            <Link to="/">
              <Button
                variant="ghost"
                className={`text-sm font-medium ${
                  location.pathname === "/"
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Événements
              </Button>
            </Link>
            <Link to="/mystery">
              <Button
                variant="ghost"
                className={`text-sm font-medium ${
                  location.pathname === "/mystery"
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Billet Mystère
              </Button>
            </Link>
            <Link to="/seller">
              <Button
                variant="ghost"
                className={`text-sm font-medium ${
                  location.pathname === "/seller"
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Organisez un événement
              </Button>
            </Link>
          </div>

          {/* Desktop Right */}
          <div className="hidden md:flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Globe className="h-4 w-4" />
            </Button>
            <Link to="/dashboard">
              <Button
                variant="outline"
                className="rounded-full gap-2 px-3 py-2 h-auto border-border hover:shadow-md transition-shadow"
              >
                <Menu className="h-4 w-4" />
                <User className="h-6 w-6 text-muted-foreground bg-muted rounded-full p-1" />
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-1">
              <Link to="/" onClick={() => setIsOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">
                  Événements
                </Button>
              </Link>
              <Link to="/mystery" onClick={() => setIsOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">
                  Billet Mystère
                </Button>
              </Link>
              <Link to="/seller" onClick={() => setIsOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">
                  Organisez un événement
                </Button>
              </Link>
              <div className="pt-4 border-t border-border mt-2">
                <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Mon compte
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
