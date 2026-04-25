import { Instagram } from 'lucide-react';

const Footer = () => (
  <footer className="border-t border-border mt-16 py-10 px-4">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
      <div className="flex items-center gap-2">
        <span className="font-extrabold text-gradient">CINE</span>
        <span className="font-light text-foreground">PLUS</span>
      </div>
      <p>© {new Date().getFullYear()} Cine Plus. Todos os direitos reservados.</p>
      <div className="flex gap-4">
        <span className="hover:text-foreground cursor-pointer transition-colors">Termos</span>
        <span className="hover:text-foreground cursor-pointer transition-colors">Privacidade</span>
        <span className="hover:text-foreground cursor-pointer transition-colors">Contato</span>
        <a href="https://www.instagram.com/ciineplus_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer">
          <Instagram className="w-5 h-5 hover:text-foreground cursor-pointer transition-colors" />
        </a>
      </div>
    </div>
    <div className="text-xs text-muted-foreground mt-4 text-center">
      Desenvolvido por: <a href="https://www.instagram.com/joeldparente?igsh=MTAyZTl2czUzbWNtZA==" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">Joel D. Parente</a>
    </div>
  </footer>
);

export default Footer;
