import { Link, NavLink, Outlet } from 'react-router-dom';
import { ShoppingBag, User2, LayoutDashboard, Gamepad2 } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import { useAuth } from '@/providers/auth-provider';
import { Button } from '@/components/ui/button';
import { ChatPanel } from '@/components/ai/chat-panel';
import { cn } from '@/lib/utils';

export function StoreLayout() {
  const { data: cart } = useCart();
  const { user } = useAuth();
  const count = cart?.itemCount ?? 0;

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b border-border/70 glass">
        <div className="container flex h-16 items-center justify-between gap-4">
          <Link to="/" className="group flex items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-lg bg-primary/15 text-primary ring-1 ring-primary/30 transition-shadow group-hover:shadow-glow-sm">
              <Gamepad2 className="size-4" />
            </span>
            <span className="font-display text-xl font-extrabold tracking-tight">
              Rift<span className="text-primary">Drop</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 text-sm md:flex">
            <NavLink to="/" className={navClass} end>
              Catalog
            </NavLink>
            {user && (
              <NavLink to="/account" className={navClass}>
                Orders
              </NavLink>
            )}
          </nav>

          <div className="flex items-center gap-2">
            {user?.role === 'ADMIN' && (
              <Button asChild variant="ghost" size="sm">
                <Link to="/admin">
                  <LayoutDashboard className="size-4" /> Admin
                </Link>
              </Button>
            )}
            <Button asChild variant="ghost" size="icon" className="relative">
              <Link to="/cart" aria-label="Cart">
                <ShoppingBag className="size-5" />
                {count > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
                    {count}
                  </span>
                )}
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm" className="border-primary/30 hover:bg-primary/10">
              <Link to={user ? '/account' : '/login'}>
                <User2 className="size-4" />
                {user ? 'Account' : 'Sign in'}
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="mt-auto border-t border-border/70 bg-card/30">
        <div className="container flex flex-col gap-4 py-10 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <p className="font-display text-lg font-bold tracking-tight">
              Rift<span className="text-primary">Drop</span>
            </p>
            <p className="max-w-sm text-sm text-muted-foreground">
              Curated PS5 and PS4 games, special editions, and the gear that belongs next to the console.
            </p>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} RiftDrop. Built for players.
          </p>
        </div>
      </footer>

      <ChatPanel />
    </div>
  );
}

const navClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    'relative text-muted-foreground transition-colors hover:text-foreground',
    isActive && 'text-foreground after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:bg-primary',
  );
