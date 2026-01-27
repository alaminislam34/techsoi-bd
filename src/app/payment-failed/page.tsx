import { Suspense } from "react";
import PaymentFailedContent from "./content";

export default function PaymentFailedPage() {
  return (
    <Suspense fallback={<PaymentFailedLoading />}>
      <PaymentFailedContent />
    </Suspense>
  );
}

function PaymentFailedLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-red-50 to-orange-50">
      <div className="animate-spin">
        <div className="h-12 w-12 border-4 border-red-200 border-t-red-500 rounded-full"></div>
      </div>
    </div>
  );
}
