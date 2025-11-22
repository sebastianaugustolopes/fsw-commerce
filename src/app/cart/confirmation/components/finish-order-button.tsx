"use client";
import { Loader2 } from "lucide-react";

import { createCheckoutSession } from "@/src/actions/create-checkout-session";
import { Button } from "@/src/components/ui/button";
import { useFinishOrder } from "@/src/hooks/mutations/use-finish-order";

const FinishOrderButton = () => {
  const finishOrderMutation = useFinishOrder();
  const handleFinishOrder = async () => {
    const { orderId } = await finishOrderMutation.mutateAsync();
    const checkoutSession = await createCheckoutSession({ orderId });
    if (!checkoutSession || !checkoutSession.url) {
      throw new Error("Failed to create checkout session");
    }
    // Redirect the browser to the Stripe Checkout url returned by the server
    window.location.href = checkoutSession.url;
  };
  return (
    <>
      <Button
        className="w-full rounded-full"
        size="lg"
        onClick={handleFinishOrder}
        disabled={finishOrderMutation.isPending}
      >
        {finishOrderMutation.isPending && (
          <Loader2 className="h-4 w-4 animate-spin" />
        )}
        Finalizar compra
      </Button>
    </>
  );
};

export default FinishOrderButton;
