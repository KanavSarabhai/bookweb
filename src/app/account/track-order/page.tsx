import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Track My Order",
};

export default function TrackOrderPage() {
  return (
    <div className="bg-ivory min-h-screen py-14">
      <div className="mx-auto max-w-md px-4">
        <h1 className="heading-page mb-2 text-center">Track my order</h1>
        <p className="font-ui text-sm text-charcoal-muted text-center mb-8">
          Enter your order details to check delivery status.
        </p>

        <form className="space-y-4 bg-surface border border-border rounded-sm p-6">
          <div>
            <label htmlFor="order-id" className="block font-ui text-sm font-medium text-brown mb-1.5">
              Order ID
            </label>
            <input
              id="order-id"
              type="text"
              name="orderId"
              required
              className="w-full font-ui text-sm border border-border rounded-sm px-3 py-2.5 bg-ivory focus:border-gold-muted outline-none"
            />
          </div>
          <div>
            <label htmlFor="track-email" className="block font-ui text-sm font-medium text-brown mb-1.5">
              Email
            </label>
            <input
              id="track-email"
              type="email"
              name="email"
              required
              className="w-full font-ui text-sm border border-border rounded-sm px-3 py-2.5 bg-ivory focus:border-gold-muted outline-none"
            />
          </div>
          <Button type="submit" className="w-full justify-center" size="lg">
            Track order
          </Button>
        </form>
      </div>
    </div>
  );
}
