import { Suspense } from "react";
import { ImportPage } from "@/features/dashboard/pages/import";

export default function Page() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-sm text-muted-foreground">Loading import workflow...</div>}>
      <ImportPage />
    </Suspense>
  );
}
