import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, Gift, Shuffle, ArrowRight, Zap, Heart, Star } from "lucide-react";

const MysteryTicketPreview = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-electric-violet/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass">
                <Sparkles className="h-4 w-4 text-primary animate-pulse" />
                <span className="text-sm font-medium">Fonctionnalité exclusive</span>
              </div>

              <h2 className="font-display text-4xl md:text-5xl font-bold">
                Le <span className="text-gradient">Billet Mystère</span>
                <br />
                L'aventure commence ici
              </h2>

              <p className="text-xl text-muted-foreground leading-relaxed">
                Laissez-vous surprendre ! Définissez simplement votre budget, vos dates
                disponibles et votre distance maximale. Notre algorithme vous propose
                un événement mystère parfaitement adapté à vos critères.
              </p>

              <div className="space-y-4">
                {[
                  { icon: Zap, text: "Réponse instantanée basée sur vos préférences" },
                  { icon: Heart, text: "Événements sélectionnés avec soin" },
                  { icon: Star, text: "Tarifs exclusifs pour les billets mystères" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-foreground">{item.text}</span>
                  </div>
                ))}
              </div>

              <Link to="/mystery">
                <Button variant="mystery" size="xl" className="group">
                  <Shuffle className="h-5 w-5 transition-transform group-hover:rotate-180" />
                  Tenter ma chance
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>

            {/* Visual */}
            <div className="relative">
              <div className="relative aspect-square max-w-md mx-auto">
                {/* Glowing Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-electric-violet/30 to-electric-indigo/20 rounded-3xl blur-2xl animate-pulse-glow" />
                
                {/* Card */}
                <div className="relative glass-strong rounded-3xl p-8 h-full flex flex-col items-center justify-center overflow-hidden">
                  {/* Animated Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                      backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--primary)) 1px, transparent 1px)`,
                      backgroundSize: '32px 32px'
                    }} />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 text-center space-y-6">
                    <div className="relative">
                      <Gift className="h-24 w-24 mx-auto text-primary animate-float" />
                      <div className="absolute inset-0 bg-primary/30 blur-2xl" />
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-display text-2xl font-bold text-gradient">
                        Billet Mystère
                      </h3>
                      <p className="text-muted-foreground">
                        Votre prochaine surprise vous attend
                      </p>
                    </div>

                    <div className="flex items-center justify-center gap-2">
                      <span className="text-3xl font-display font-bold">?</span>
                      <span className="text-3xl font-display font-bold">?</span>
                      <span className="text-3xl font-display font-bold">?</span>
                    </div>

                    <div className="flex flex-wrap justify-center gap-2">
                      {["Concert", "Spectacle", "Expo", "Festival"].map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary border border-primary/30"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Corner Decorations */}
                  <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-primary/30 rounded-tl-lg" />
                  <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-primary/30 rounded-tr-lg" />
                  <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-primary/30 rounded-bl-lg" />
                  <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-primary/30 rounded-br-lg" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MysteryTicketPreview;
