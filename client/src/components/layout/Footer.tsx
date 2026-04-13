export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-muted/50 px-6 py-10">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-12 md:grid-cols-4">
        <div className="col-span-2 space-y-6 md:col-span-1">
          <span className="font-serif text-2xl font-bold text-primary">
            LegacyCare
          </span>
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
            © {new Date().getFullYear()} LegacyCare. A Sanctuary for End-of-Life
            Planning.
          </p>
        </div>

        <div className="space-y-6">
          <h4 className="text-xs font-bold tracking-widest text-primary/60 uppercase">
            Product
          </h4>
          <ul className="space-y-4 text-sm text-muted-foreground">
            <li>
              <a href="#" className="transition-colors hover:text-primary">
                Features
              </a>
            </li>
            <li>
              <a href="#" className="transition-colors hover:text-primary">
                Pricing
              </a>
            </li>
            <li>
              <a href="#" className="transition-colors hover:text-primary">
                Support
              </a>
            </li>
            <li>
              <a href="#" className="transition-colors hover:text-primary">
                Documentation
              </a>
            </li>
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="text-xs font-bold tracking-widest text-primary/60 uppercase">
            Legal
          </h4>
          <ul className="space-y-4 text-sm text-muted-foreground">
            <li>
              <a href="#" className="transition-colors hover:text-primary">
                Security
              </a>
            </li>
            <li>
              <a href="#" className="transition-colors hover:text-primary">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="transition-colors hover:text-primary">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="text-xs font-bold tracking-widest text-primary/60 uppercase">
            Contact
          </h4>
          <ul className="space-y-4 text-sm text-muted-foreground">
            <li>
              <a href="#" className="transition-colors hover:text-primary">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" className="transition-colors hover:text-primary">
                Partnerships
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
