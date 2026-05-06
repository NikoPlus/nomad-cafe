// // app/[locale]/(app)/orders/[id]/page.tsx

// import { locales } from '@/i18n';  // ✅ import shared locale config

// // ===== generateStaticParams =====
// // Tells Next.js which locale/id combos to pre‑render at build time
// export async function generateStaticParams() {
//   // ---------- Fetch all order IDs that need static pages ----------
//   // 🔁 Replace this with your real data source (e.g. your API)
//   async function getAllOrderIds(): Promise<string[]> {
//     // static demo values – you will replace this with a real fetch
//     return ['ORD-001', 'ORD-002', 'ORD-003'];
//   }

//   const orderIds = await getAllOrderIds();

//   // Create params for every locale × id pair
//   const params: Array<{ locale: string; id: string }> = [];
//   for (const locale of locales) {          // ✅ uses your actual locales (en, fa)
//     for (const id of orderIds) {
//       params.push({ locale, id });
//     }
//   }
//   return params;
// }

// // ===== Client Component =====
// "use client";

// import * as React from "react";
// import { useParams } from "next/navigation";
// import { CheckCircle2, Clock, Loader2 } from "lucide-react";

// export default function OrderStatusPage() {
//   const params = useParams<{ id: string }>();

//   // Simulated status progression
//   const [status, setStatus] = React.useState<"created" | "pending" | "paid">(
//     "created"
//   );

//   React.useEffect(() => {
//     const timers = [
//       setTimeout(() => setStatus("pending"), 1200),
//       setTimeout(() => setStatus("paid"), 3000),
//     ];
//     return () => timers.forEach(clearTimeout);
//   }, []);

//   return (
//     <main className="mx-auto max-w-2xl">
//       <h2 className="text-xl font-semibold">Order #{params.id}</h2>
//       <p className="mt-1 text-sm text-muted-foreground">
//         This page simulates status updates. Hook it to SSE or websockets for
//         realtime.
//       </p>

//       <div className="mt-6 space-y-3">
//         <Step label="Created" active={true} done={status !== "created"} />
//         <Step
//           label="Pending confirmation"
//           active={status === "pending"}
//           done={status === "paid"}
//         />
//         <Step label="Paid" active={status === "paid"} done={status === "paid"} />
//       </div>
//     </main>
//   );
// }

// function Step({
//   label,
//   active,
//   done,
// }: {
//   label: string;
//   active: boolean;
//   done: boolean;
// }) {
//   return (
//     <div className="flex items-center gap-3 rounded border p-3">
//       {done ? (
//         <CheckCircle2 className="h-5 w-5 text-green-600" />
//       ) : active ? (
//         <Loader2 className="h-5 w-5 animate-spin text-primary" />
//       ) : (
//         <Clock className="h-5 w-5 text-muted-foreground" />
//       )}
//       <div className="text-sm">{label}</div>
//     </div>
//   );
// }


// app/[locale]/(app)/orders/[id]/page.tsx

import { locales } from '@/i18n';           // your existing locale config
import OrderStatusClient from './OrderStatusClient';

// ✅ Server‑side function – works because this file has NO "use client"
export async function generateStaticParams() {
  // ---------- Fetch all order IDs that need static pages ----------
  // 🔁 Replace with your real data source (API, CMS, database)
  async function getAllOrderIds(): Promise<string[]> {
    return ['ORD-001', 'ORD-002', 'ORD-003'];   // demo data
  }

  const orderIds = await getAllOrderIds();

  // Build [locale, id] pairs for all combinations
  const params: Array<{ locale: string; id: string }> = [];
  for (const locale of locales) {
    for (const id of orderIds) {
      params.push({ locale, id });
    }
  }
  return params;
}

// ✅ Server Component – just renders the client component
export default function OrderStatusPage() {
  return <OrderStatusClient />;
}
