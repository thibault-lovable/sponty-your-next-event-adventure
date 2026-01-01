import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Ticket,
  Calendar,
  MapPin,
  Clock,
  QrCode,
  Share2,
  RefreshCw,
  History,
  Star,
  User,
} from "lucide-react";

const mockTickets = [
  {
    id: "1",
    eventTitle: "Neon Dreams Festival",
    date: "2026-02-15",
    time: "20:00",
    location: "Paris, Bercy Arena",
    status: "upcoming",
    qrCode: "SPNT-2026-NEON-001",
    price: 75,
  },
  {
    id: "2",
    eventTitle: "Comedy Night Live",
    date: "2026-01-20",
    time: "21:00",
    location: "Lyon, Le Transbordeur",
    status: "upcoming",
    qrCode: "SPNT-2026-CMDY-002",
    price: 35,
  },
  {
    id: "3",
    eventTitle: "Tech Innovation Summit 2025",
    date: "2025-11-10",
    time: "09:00",
    location: "Marseille, Palais des Congrès",
    status: "past",
    qrCode: "SPNT-2025-TECH-003",
    price: 150,
  },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("tickets");

  const upcomingTickets = mockTickets.filter((t) => t.status === "upcoming");
  const pastTickets = mockTickets.filter((t) => t.status === "past");

  return (
    <>
      <Helmet>
        <title>Mon Espace - Sponty</title>
        <meta
          name="description"
          content="Gérez vos billets, consultez votre historique et accédez à vos QR codes depuis votre espace personnel Sponty."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />

        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                  <User className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h1 className="font-display text-2xl font-bold">Bonjour, Alex 👋</h1>
                  <p className="text-muted-foreground">
                    Gérez vos billets et votre compte
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="glass rounded-lg px-4 py-2 text-center">
                  <p className="text-2xl font-display font-bold text-gradient">
                    {upcomingTickets.length}
                  </p>
                  <p className="text-xs text-muted-foreground">Événements à venir</p>
                </div>
                <div className="glass rounded-lg px-4 py-2 text-center">
                  <p className="text-2xl font-display font-bold text-gradient">
                    {pastTickets.length}
                  </p>
                  <p className="text-xs text-muted-foreground">Événements passés</p>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="glass-strong mb-6">
                <TabsTrigger value="tickets" className="gap-2">
                  <Ticket className="h-4 w-4" />
                  Mes billets
                </TabsTrigger>
                <TabsTrigger value="history" className="gap-2">
                  <History className="h-4 w-4" />
                  Historique
                </TabsTrigger>
                <TabsTrigger value="favorites" className="gap-2">
                  <Star className="h-4 w-4" />
                  Favoris
                </TabsTrigger>
              </TabsList>

              {/* Tickets Tab */}
              <TabsContent value="tickets" className="space-y-4">
                {upcomingTickets.length > 0 ? (
                  upcomingTickets.map((ticket) => (
                    <div
                      key={ticket.id}
                      className="glass-strong rounded-xl p-6 flex flex-col lg:flex-row gap-6"
                    >
                      {/* QR Code Section */}
                      <div className="flex-shrink-0 flex flex-col items-center justify-center p-4 bg-foreground/5 rounded-xl">
                        <div className="w-32 h-32 bg-foreground rounded-lg flex items-center justify-center mb-2">
                          <QrCode className="h-24 w-24 text-background" />
                        </div>
                        <p className="text-xs font-mono text-muted-foreground">
                          {ticket.qrCode}
                        </p>
                      </div>

                      {/* Event Details */}
                      <div className="flex-1 space-y-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <Badge className="mb-2 bg-success/20 text-success border-success/30">
                              Confirmé
                            </Badge>
                            <h3 className="font-display text-xl font-semibold">
                              {ticket.eventTitle}
                            </h3>
                          </div>
                          <p className="text-xl font-display font-bold text-gradient">
                            {ticket.price}€
                          </p>
                        </div>

                        <div className="grid sm:grid-cols-3 gap-4">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="h-4 w-4 text-primary" />
                            <span>{new Date(ticket.date).toLocaleDateString("fr-FR")}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="h-4 w-4 text-primary" />
                            <span>{ticket.time}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin className="h-4 w-4 text-primary" />
                            <span>{ticket.location}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 pt-2">
                          <Button variant="outline" size="sm" className="gap-2">
                            <Share2 className="h-4 w-4" />
                            Partager
                          </Button>
                          <Button variant="outline" size="sm" className="gap-2">
                            <RefreshCw className="h-4 w-4" />
                            Revendre
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-16 glass-strong rounded-xl">
                    <Ticket className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-display text-xl font-semibold mb-2">
                      Aucun billet à venir
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Découvrez nos événements et réservez votre prochain moment
                    </p>
                    <Button variant="glow">Explorer les événements</Button>
                  </div>
                )}
              </TabsContent>

              {/* History Tab */}
              <TabsContent value="history" className="space-y-4">
                {pastTickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="glass rounded-xl p-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between opacity-75"
                  >
                    <div>
                      <Badge variant="outline" className="mb-2">
                        Terminé
                      </Badge>
                      <h3 className="font-display text-lg font-semibold">
                        {ticket.eventTitle}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                        <span>{new Date(ticket.date).toLocaleDateString("fr-FR")}</span>
                        <span>{ticket.location}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      Laisser un avis
                    </Button>
                  </div>
                ))}
              </TabsContent>

              {/* Favorites Tab */}
              <TabsContent value="favorites">
                <div className="text-center py-16 glass-strong rounded-xl">
                  <Star className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-display text-xl font-semibold mb-2">
                    Aucun favori pour le moment
                  </h3>
                  <p className="text-muted-foreground">
                    Ajoutez des événements à vos favoris pour les retrouver facilement
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Dashboard;
