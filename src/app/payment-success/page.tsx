import { Suspense } from "react";
import PaymentSuccessContent from "./content";

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<PaymentSuccessLoading />}>
      <PaymentSuccessContent />
    </Suspense>
  );
}

function PaymentSuccessLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-cyan-50">
      <div className="animate-spin">
        <div className="h-12 w-12 border-4 border-blue-200 border-t-blue-500 rounded-full"></div>
      </div>
    </div>
  );
}
