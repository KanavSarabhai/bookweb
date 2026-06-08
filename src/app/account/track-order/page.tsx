import type { Metadata } from "next";
import { ActionLink } from "@/components/ui/ActionLink";

export const metadata: Metadata = {
  title: "Track My Order",
};

const inputClass =
  "w-full font-ui text-sm border border-brick rounded-[3.75px] px-3 py-2.5 bg-cream text-press outline-none focus:ring-1 focus:ring-brick";

export default function TrackOrderPage() {
  return (
    <div className="bg-cream min-h-screen py-14 lg:py-20">
      <div className="mx-auto max-w-md px-4">
        <p className="section-label mb-4 text-center">Orders</p>
        <hr className="hairline mb-8" />
        <h1 className="heading-page mb-2 text-center">Track my order</h1>
        <p className="text-body text-center mb-8">
          Enter your order details to check delivery status.
        </p>

        <form className="space-y-4 card-editorial bg-soft-grey">
          <div>
            <label htmlFor="order-id" className="block section-label mb-2">
              Order ID
            </label>
            <input id="order-id" type="text" name="orderId" required className={inputClass} />
          </div>
          <div>
            <label htmlFor="track-email" className="block section-label mb-2">
              Email
            </label>
            <input id="track-email" type="email" name="email" required className={inputClass} />
          </div>
          <ActionLink type="submit" className="w-full justify-center">
            Track order →
          </ActionLink>
        </form>
      </div>
    </div>
  );
}
