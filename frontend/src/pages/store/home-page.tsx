import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, Search, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Skeleton, EmptyState } from '@/components/ui/misc';
import { Pagination } from '@/components/pagination';
import { useCategories, useStorefrontProducts } from '@/hooks/use-catalog';
import { cn, formatMoney } from '@/lib/utils';
import type { Product } from '@/lib/types';

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=1800&h=1100&q=80';

function Hero() {
  return (
    <section className="relative min-h-[min(92vh,820px)] w-full overflow-hidden">
      <img
        src={HERO_IMAGE}
        alt="PlayStation DualSense controller in dramatic light"
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />
      <div className="absolute inset-0 grid-haze opacity-40" aria-hidden />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-40 overflow-hidden opacity-30"
        aria-hidden
      >
        <div className="h-px w-full bg-gradient-to-r from-transparent via-primary to-transparent animate-scan" />
      </div>

      <div className="container relative flex min-h-[min(92vh,820px)] flex-col justify-end pb-16 pt-28 md:justify-center md:pb-24 md:pt-20">
        <div className="max-w-2xl space-y-6">
          <p className="animate-rise font-display text-5xl font-extrabold tracking-tight text-glow sm:text-6xl md:text-7xl lg:text-8xl">
            Rift<span className="text-primary">Drop</span>
          </p>
          <h1 className="animate-rise-delay max-w-xl font-display text-2xl font-semibold leading-tight tracking-tight text-foreground/95 sm:text-3xl md:text-4xl">
            PS5 and PS4 games, ready when you are.
          </h1>
          <p className="animate-rise-delay-2 max-w-md text-base text-muted-foreground md:text-lg">
            New releases, back-catalog classics, and DualSense-ready gear — sealed, tracked, and shipped fast.
          </p>
          <div className="animate-rise-delay-2 flex flex-wrap items-center gap-3 pt-2">
            <Button asChild size="lg" className="shadow-glow">
              <a href="#catalog">
                Browse catalog <ArrowDown className="size-4" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-primary/35 bg-background/30 backdrop-blur">
              <Link to="/login">Track an order</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function CategoryChips({
  selected,
  onSelect,
}: {
  selected: string | undefined;
  onSelect: (id: string | undefined) => void;
}) {
  const { data: categories } = useCategories();
  const chip = (active: boolean) =>
    cn(
      'cursor-pointer rounded-md border px-4 py-2 text-sm transition-all duration-200',
      active
        ? 'border-primary/60 bg-primary/15 text-primary shadow-glow-sm'
        : 'border-border text-muted-foreground hover:border-primary/40 hover:text-foreground',
    );

  return (
    <div className="flex flex-wrap gap-2">
      <button type="button" className={chip(!selected)} onClick={() => onSelect(undefined)}>
        All titles
      </button>
      {categories?.map((category) => (
        <button
          key={category.id}
          type="button"
          className={chip(selected === category.id)}
          onClick={() => onSelect(category.id)}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  const image = product.images[0]?.url;
  const price = product.variants.length
    ? Math.min(...product.variants.map((variant) => variant.priceAmount))
    : 0;
  const platform =
    typeof product.attributes?.platform === 'string' ? product.attributes.platform : null;

  return (
    <Link to={`/products/${product.slug}`} className="group block space-y-3">
      <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-border/80 bg-secondary transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-glow-sm">
        {image ? (
          <img
            src={image}
            alt={product.name}
            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="size-full bg-gradient-to-br from-secondary to-background" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-80" />
        {platform && (
          <span className="absolute left-3 top-3 rounded-md bg-background/80 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary ring-1 ring-primary/30 backdrop-blur">
            {platform}
          </span>
        )}
        <div className="absolute inset-x-0 bottom-0 p-3 translate-y-1 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary">
            <Sparkles className="size-3" /> View title
          </span>
        </div>
      </div>
      <div className="space-y-1 px-0.5">
        {product.brand && (
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            {product.brand}
          </p>
        )}
        <p className="font-display text-base font-semibold leading-tight transition-colors group-hover:text-primary">
          {product.name}
        </p>
        <p className="text-sm text-muted-foreground">from {formatMoney(price)}</p>
      </div>
    </Link>
  );
}

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="space-y-3">
          <Skeleton className="aspect-[3/4] w-full rounded-xl" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-1/3" />
        </div>
      ))}
    </div>
  );
}

export function HomePage() {
  const [search, setSearch] = useState('');
  const [categoryId, setCategoryId] = useState<string | undefined>();
  const [page, setPage] = useState(1);

  const { data, isLoading } = useStorefrontProducts({
    search: search || undefined,
    categoryId,
    page,
  });

  const products = data?.data ?? [];

  return (
    <div>
      <Hero />

      <div id="catalog" className="container space-y-10 py-14 md:py-16">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">Catalog</p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-4xl">
              What&apos;s in the drop
            </h2>
            <p className="mt-2 max-w-lg text-muted-foreground">
              Filter by platform or search by title — discs, digital codes, and deluxe editions.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <CategoryChips
            selected={categoryId}
            onSelect={(id) => {
              setCategoryId(id);
              setPage(1);
            }}
          />
          <div className="relative w-full md:max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              placeholder="Search titles, studios…"
              className="border-primary/20 pl-9 focus-visible:ring-primary"
            />
          </div>
        </div>

        {isLoading ? (
          <ProductGridSkeleton />
        ) : products.length === 0 ? (
          <EmptyState
            title="No titles found"
            description="Try another search, or clear the platform filter."
          />
        ) : (
          <>
            <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <Pagination
              page={data?.meta.page ?? 1}
              totalPages={data?.meta.totalPages ?? 1}
              onPageChange={setPage}
            />
          </>
        )}
      </div>
    </div>
  );
}
