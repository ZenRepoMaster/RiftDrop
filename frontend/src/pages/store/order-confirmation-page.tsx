import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { clearCartToken } from '@/lib/cart-token';

export function OrderConfirmationPage() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const orderNumber = searchParams.get('order');

  useEffect(() => {
    clearCartToken();
    queryClient.invalidateQueries({ queryKey: ['cart'] });
  }, [queryClient]);

  return (
    <div className="container flex justify-center py-12 md:py-16">
      <Card className="w-full max-w-md border-primary/20 text-center">
        <CardContent className="space-y-6 p-10">
          <div className="flex justify-center">
            <span className="flex size-16 items-center justify-center rounded-full bg-success/15">
              <CheckCircle2 className="size-9 text-success" />
            </span>
          </div>
          <div className="space-y-2">
            <h1 className="font-display text-2xl font-bold tracking-tight">Drop confirmed</h1>
            <p className="text-muted-foreground">
              Thanks for shopping RiftDrop. Your games are queued for fulfillment, and a receipt is
              on the way.
            </p>
          </div>
          {orderNumber && (
            <div className="rounded-lg border border-border bg-secondary/40 py-3">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Order number</p>
              <p className="font-medium">{orderNumber}</p>
            </div>
          )}
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild className="flex-1 shadow-glow">
              <Link to="/account">View orders</Link>
            </Button>
            <Button asChild variant="outline" className="flex-1">
              <Link to="/">Back to catalog</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
