import { Menu } from "lucide-react";
import { Button } from "../ui/button";

export function Navbar() {
  return (
    <nav className="border-bottom sticky top-0 z-50 flex w-full items-center justify-between border-border/40 bg-background/80 px-6 py-4 backdrop-blur-md">
      <div className="flex items-center gap-2">
        <span className="font-serif text-2xl font-bold tracking-tight text-primary">
          LegacyCare
        </span>
      </div>

      <div className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
        <a href="#" className="transition-colors hover:text-primary">
          Features
        </a>
        <a href="#" className="transition-colors hover:text-primary">
          How It Works
        </a>
        <a href="#" className="transition-colors hover:text-primary">
          For Families
        </a>
        <a href="#" className="transition-colors hover:text-primary">
          For Providers
        </a>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" className="hidden sm:inline-flex">
          Login
        </Button>
        <Button className="rounded-full px-6">Get Started</Button>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </div>
    </nav>
  );
}
