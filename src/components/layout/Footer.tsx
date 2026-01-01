import { Link } from "react-router-dom";
import { Ticket, Instagram, Twitter, Facebook, Linkedin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { label: "Événements", path: "/" },
      { label: "Billet Mystère", path: "/mystery" },
      { label: "Organisateurs", path: "/seller" },
      { label: "Tarifs", path: "/pricing" },
    ],
    company: [
      { label: "À propos", path: "/about" },
      { label: "Blog", path: "/blog" },
      { label: "Carrières", path: "/careers" },
      { label: "Contact", path: "/contact" },
    ],
    legal: [
      { label: "CGU", path: "/terms" },
      { label: "Confidentialité", path: "/privacy" },
      { label: "Cookies", path: "/cookies" },
      { label: "Mentions légales", path: "/legal" },
    ],
  };

  const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  return (
    <footer className="border-t border-border/50 bg-card/50">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <Ticket className="h-8 w-8 text-primary" />
              <span className="font-display text-2xl font-bold text-gradient">
                Sponty
              </span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs">
              La plateforme de billetterie qui rend chaque événement unique.
              Découvrez, réservez, vivez.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display font-semibold mb-4 text-foreground">Produit</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4 text-foreground">Entreprise</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4 text-foreground">Légal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © {currentYear} Sponty. Tous droits réservés.
          </p>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Fait avec</span>
            <span className="text-primary">💜</span>
            <span className="text-xs text-muted-foreground">en France</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
