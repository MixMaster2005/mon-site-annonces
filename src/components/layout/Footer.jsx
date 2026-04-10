export default function Footer() {
  return (
    <footer className="border-t border-border bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Fianarana</h3>
            <p className="text-sm text-muted-foreground">
              Platforme për të blerë dhe shitur produktet e dyta në mënyrë të sigurt.
            </p>
            <div className="flex gap-4 mt-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition">
                <span className="sr-only">Facebook</span>f
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition">
                <span className="sr-only">Twitter</span>𝕏
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition">
                <span className="sr-only">Instagram</span>📷
              </a>
            </div>
          </div>

          {/* Browse Column */}
          <div>
            <h4 className="font-semibold mb-4">Shfletim</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition">Të gjitha kategoritë</a></li>
              <li><a href="#" className="hover:text-primary transition">Annonsat e reja</a></li>
              <li><a href="#" className="hover:text-primary transition">Më të nxehtët</a></li>
              <li><a href="#" className="hover:text-primary transition">Oferta speciale</a></li>
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h4 className="font-semibold mb-4">Suporta</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition">Ndihmë</a></li>
              <li><a href="#" className="hover:text-primary transition">Kontakti</a></li>
              <li><a href="#" className="hover:text-primary transition">Si të përdoret</a></li>
              <li><a href="#" className="hover:text-primary transition">Pyetjet e bëra shpesh</a></li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="font-semibold mb-4">Ligjore</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition">Kushtet e përdorimit</a></li>
              <li><a href="#" className="hover:text-primary transition">Politika e privatësisë</a></li>
              <li><a href="#" className="hover:text-primary transition">Politika e cookies</a></li>
              <li><a href="#" className="hover:text-primary transition">Impikat</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm text-muted-foreground">
          <p>© 2026 Fianarana. Të gjitha të drejtat e rezervuara.</p>
          <div className="flex gap-6">
            <button className="hover:text-primary transition">Preferencat e cookies</button>
            <button className="hover:text-primary transition">Zgjedh gjuhën</button>
          </div>
        </div>
      </div>
    </footer>
  )
}
