import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  LayoutDashboard,
  Plus,
  Calendar,
  Users,
  Euro,
  TrendingUp,
  Ticket,
  BarChart3,
  Settings,
  Eye,
} from "lucide-react";

const mockSellerEvents = [
  {
    id: "1",
    title: "Neon Dreams Festival",
    date: "2026-02-15",
    soldTickets: 2500,
    totalTickets: 5000,
    revenue: 187500,
    status: "live",
  },
  {
    id: "2",
    title: "Summer Beach Party",
    date: "2026-07-20",
    soldTickets: 0,
    totalTickets: 2000,
    revenue: 0,
    status: "draft",
  },
  {
    id: "3",
    title: "Winter Jazz Night",
    date: "2025-12-15",
    soldTickets: 300,
    totalTickets: 300,
    revenue: 13500,
    status: "sold-out",
  },
];

const SellerDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const totalRevenue = mockSellerEvents.reduce((sum, e) => sum + e.revenue, 0);
  const totalSold = mockSellerEvents.reduce((sum, e) => sum + e.soldTickets, 0);
  const totalTickets = mockSellerEvents.reduce((sum, e) => sum + e.totalTickets, 0);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "live":
        return <Badge className="bg-success/20 text-success border-success/30">En vente</Badge>;
      case "draft":
        return <Badge variant="outline">Brouillon</Badge>;
      case "sold-out":
        return <Badge className="bg-warning/20 text-warning border-warning/30">Complet</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <>
      <Helmet>
        <title>Espace Organisateur - Sponty</title>
        <meta
          name="description"
          content="Gérez vos événements, suivez vos ventes en temps réel et analysez vos performances depuis l'espace organisateur Sponty."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />

        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="font-display text-2xl font-bold mb-1">
                  Espace Organisateur
                </h1>
                <p className="text-muted-foreground">
                  Gérez vos événements et suivez vos ventes
                </p>
              </div>
              <Button variant="glow" className="gap-2">
                <Plus className="h-4 w-4" />
                Créer un événement
              </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="glass-strong rounded-xl p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Euro className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground">Revenus totaux</span>
                </div>
                <p className="text-2xl font-display font-bold text-gradient">
                  {totalRevenue.toLocaleString()}€
                </p>
              </div>
              <div className="glass-strong rounded-xl p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Ticket className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground">Billets vendus</span>
                </div>
                <p className="text-2xl font-display font-bold">{totalSold.toLocaleString()}</p>
              </div>
              <div className="glass-strong rounded-xl p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground">Événements</span>
                </div>
                <p className="text-2xl font-display font-bold">{mockSellerEvents.length}</p>
              </div>
              <div className="glass-strong rounded-xl p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground">Taux de vente</span>
                </div>
                <p className="text-2xl font-display font-bold">
                  {Math.round((totalSold / totalTickets) * 100)}%
                </p>
              </div>
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="glass-strong mb-6">
                <TabsTrigger value="overview" className="gap-2">
                  <LayoutDashboard className="h-4 w-4" />
                  Vue d'ensemble
                </TabsTrigger>
                <TabsTrigger value="events" className="gap-2">
                  <Calendar className="h-4 w-4" />
                  Événements
                </TabsTrigger>
                <TabsTrigger value="analytics" className="gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Statistiques
                </TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <h2 className="font-display text-xl font-semibold">
                  Vos événements actifs
                </h2>
                <div className="space-y-4">
                  {mockSellerEvents
                    .filter((e) => e.status === "live")
                    .map((event) => (
                      <div
                        key={event.id}
                        className="glass-strong rounded-xl p-6 space-y-4"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            {getStatusBadge(event.status)}
                            <h3 className="font-display text-lg font-semibold mt-2">
                              {event.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {new Date(event.date).toLocaleDateString("fr-FR", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-display font-bold text-gradient">
                              {event.revenue.toLocaleString()}€
                            </p>
                            <p className="text-sm text-muted-foreground">revenus</p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                              {event.soldTickets} / {event.totalTickets} billets vendus
                            </span>
                            <span className="font-medium">
                              {Math.round((event.soldTickets / event.totalTickets) * 100)}%
                            </span>
                          </div>
                          <Progress
                            value={(event.soldTickets / event.totalTickets) * 100}
                            className="h-2"
                          />
                        </div>

                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="gap-2">
                            <Eye className="h-4 w-4" />
                            Voir
                          </Button>
                          <Button variant="outline" size="sm" className="gap-2">
                            <Settings className="h-4 w-4" />
                            Gérer
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </TabsContent>

              {/* Events Tab */}
              <TabsContent value="events" className="space-y-4">
                {mockSellerEvents.map((event) => (
                  <div
                    key={event.id}
                    className="glass rounded-xl p-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
                  >
                    <div className="space-y-1">
                      {getStatusBadge(event.status)}
                      <h3 className="font-display text-lg font-semibold">
                        {event.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {new Date(event.date).toLocaleDateString("fr-FR")} •{" "}
                        {event.soldTickets}/{event.totalTickets} vendus
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Modifier
                      </Button>
                      <Button variant="glow" size="sm">
                        Voir les ventes
                      </Button>
                    </div>
                  </div>
                ))}
              </TabsContent>

              {/* Analytics Tab */}
              <TabsContent value="analytics">
                <div className="glass-strong rounded-xl p-8 text-center">
                  <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-display text-xl font-semibold mb-2">
                    Statistiques détaillées
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Les graphiques et analyses détaillées seront disponibles prochainement
                  </p>
                  <Button variant="outline">En savoir plus</Button>
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

export default SellerDashboard;
