import { Suspense } from "react";
import PaymentCancelledContent from "./content";

export default function PaymentCancelledPage() {
  return (
    <Suspense fallback={<PaymentCancelledLoading />}>
      <PaymentCancelledContent />
    </Suspense>
  );
}

function PaymentCancelledLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-amber-50 to-yellow-50">
      <div className="animate-spin">
        <div className="h-12 w-12 border-4 border-amber-200 border-t-amber-500 rounded-full"></div>
      </div>
    </div>
  );
}
