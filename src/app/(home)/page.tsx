import type { Metadata } from "next";
import HBTJMasterPlan from "@/components/HBTJMasterPlan";

export const metadata: Metadata = {
  title: "HBTJ Master Plan — Plan Estratégico Integrado",
  description:
    "Plan estratégico integrado para HBTJ Consultores Lingüísticos: traducción jurada, academia FLE HolaBonjour, y marketplace TraductorJurado.es.",
};

export default function HomePage() {
  return <HBTJMasterPlan />;
}
