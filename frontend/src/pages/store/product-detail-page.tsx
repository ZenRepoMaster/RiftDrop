import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Minus, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PageLoader, EmptyState } from '@/components/ui/misc';
import { useProductBySlug } from '@/hooks/use-catalog';
import { useCartMutations } from '@/hooks/use-cart';
import { Recommendations } from '@/components/store/recommendations';
import { trackEvent } from '@/lib/analytics';
import { apiErrorMessage } from '@/lib/api';
import { cn, formatMoney } from '@/lib/utils';
import type { Product, ProductImage, ProductVariant } from '@/lib/types';

function Gallery({ images, name }: { images: ProductImage[]; name: string }) {
  const [active, setActive] = useState(0);
  const main = images[active]?.url;

  return (
    <div className="space-y-4">
      <div className="aspect-[3/4] overflow-hidden rounded-2xl border border-border/80 bg-secondary shadow-glow-sm md:aspect-square">
        {main ? (
          <img src={main} alt={name} className="size-full object-cover" />
        ) : (
          <div className="size-full bg-gradient-to-br from-secondary to-background" />
        )}
      </div>
      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-3">
          {images.map((image, index) => (
            <button
              key={image.id}
              type="button"
              onClick={() => setActive(index)}
              className={cn(
                'aspect-square cursor-pointer overflow-hidden rounded-lg border bg-secondary transition-all duration-200',
                active === index
                  ? 'border-primary shadow-glow-sm ring-1 ring-primary/40'
                  : 'border-border hover:border-primary/40',
              )}
            >
              <img src={image.url} alt={image.alt ?? name} className="size-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function QuantityStepper({
  value,
  onChange,
}: {
  value: number;
  onChange: (next: number) => void;
}) {
  return (
    <div className="inline-flex items-center rounded-lg border border-border">
      <Button
        variant="ghost"
        size="icon"
        className="size-9"
        onClick={() => onChange(Math.max(1, value - 1))}
        aria-label="Decrease quantity"
      >
        <Minus className="size-4" />
      </Button>
      <span className="w-10 text-center text-sm font-semibold">{value}</span>
      <Button
        variant="ghost"
        size="icon"
        className="size-9"
        onClick={() => onChange(value + 1)}
        aria-label="Increase quantity"
      >
        <Plus className="size-4" />
      </Button>
    </div>
  );
}

function AttributeRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-border/60 py-2.5 text-sm last:border-0">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

function ProductDetail({ product }: { product: Product }) {
  const activeVariants = product.variants.filter((variant) => variant.isActive);
  const variants = activeVariants.length ? activeVariants : product.variants;
  const [selectedId, setSelectedId] = useState(variants[0]?.id ?? '');
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCartMutations();

  const selected = useMemo<ProductVariant | undefined>(
    () => variants.find((variant) => variant.id === selectedId) ?? variants[0],
    [variants, selectedId],
  );

  const outOfStock = !selected || selected.inventoryQuantity === 0;
  const attrs = product.attributes ?? {};

  async function handleAdd() {
    if (!selected) return;
    try {
      await addItem.mutateAsync({ variantId: selected.id, quantity });
      toast.success('Added to cart');
    } catch (error) {
      toast.error(apiErrorMessage(error, 'Could not add to cart'));
    }
  }

  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
      <Gallery images={product.images} name={product.name} />

      <div className="space-y-8">
        <div className="space-y-4">
          {product.brand && (
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
              {product.brand}
            </p>
          )}
          <h1 className="font-display text-3xl font-bold tracking-tight md:text-4xl">{product.name}</h1>
          <p className="font-display text-2xl font-semibold text-foreground">
            {selected ? formatMoney(selected.priceAmount) : '—'}
            {selected?.compareAtAmount && selected.compareAtAmount > selected.priceAmount && (
              <span className="ml-3 text-base font-normal text-muted-foreground line-through">
                {formatMoney(selected.compareAtAmount)}
              </span>
            )}
          </p>
        </div>

        {product.description && (
          <p className="leading-relaxed text-muted-foreground">{product.description}</p>
        )}

        {Boolean(attrs.platform || attrs.genre || attrs.players || attrs.rating) && (
          <div className="rounded-xl border border-border/80 bg-card/50 px-4 py-1">
            {typeof attrs.platform === 'string' && (
              <AttributeRow label="Platform" value={attrs.platform} />
            )}
            {typeof attrs.genre === 'string' && <AttributeRow label="Genre" value={attrs.genre} />}
            {typeof attrs.players === 'string' && (
              <AttributeRow label="Players" value={attrs.players} />
            )}
            {typeof attrs.rating === 'string' && (
              <AttributeRow label="Rating" value={attrs.rating} />
            )}
          </div>
        )}

        {variants.length > 0 && (
          <div className="space-y-3">
            <p className="text-sm font-medium">Edition / format</p>
            <div className="flex flex-wrap gap-2">
              {variants.map((variant) => (
                <button
                  key={variant.id}
                  type="button"
                  disabled={variant.inventoryQuantity === 0}
                  onClick={() => setSelectedId(variant.id)}
                  className={cn(
                    'cursor-pointer rounded-lg border px-4 py-2.5 text-sm transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-40',
                    selected?.id === variant.id
                      ? 'border-primary bg-primary/15 text-primary shadow-glow-sm'
                      : 'border-border hover:border-primary/40',
                  )}
                >
                  {variant.name}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-4">
          <QuantityStepper value={quantity} onChange={setQuantity} />
          <Button
            onClick={handleAdd}
            disabled={outOfStock || addItem.isPending}
            size="lg"
            className="shadow-glow"
          >
            {outOfStock ? 'Out of stock' : addItem.isPending ? 'Adding…' : 'Add to cart'}
          </Button>
          {outOfStock && <Badge variant="muted">Sold out</Badge>}
        </div>
      </div>
    </div>
  );
}

export function ProductDetailPage() {
  const { slug = '' } = useParams();
  const { data: product, isLoading, isError } = useProductBySlug(slug);

  useEffect(() => {
    if (product) trackEvent('PRODUCT_VIEWED', { productId: product.id });
  }, [product?.id]);

  return (
    <div className="container space-y-10 py-10 md:py-14">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft className="size-4" /> Back to catalog
      </Link>

      {isLoading ? (
        <PageLoader />
      ) : isError || !product ? (
        <EmptyState title="Title not found" description="This game may no longer be in the drop." />
      ) : (
        <>
          <ProductDetail product={product} />
          <Recommendations productId={product.id} />
        </>
      )}
    </div>
  );
}
