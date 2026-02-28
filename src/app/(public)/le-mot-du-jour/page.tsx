import type { Metadata } from "next";
import { getTodayExpression, expressions } from "@/data/mots/expressions";
import MotDuJourFull from "@/components/le-mot-du-jour/MotDuJourFull";
import NewsletterForm from "@/components/le-mot-du-jour/NewsletterForm";

export const metadata: Metadata = {
  title: "Le Mot du Jour — Expresion francesa del dia | HolaBonjour",
  description:
    "Aprende una expresion francesa cada dia con HolaBonjour. Modismos, expresiones coloquiales y frases utiles del frances.",
};

export default function LeMotDuJourPage() {
  const todayExpression = getTodayExpression();
  const recentExpressions = expressions.slice(0, 10);

  return (
    <div className="vie-section min-h-screen">
      <div className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="vie-heading text-3xl font-bold sm:text-4xl">
          Le Mot du Jour
        </h1>
        <p
          className="mt-2 text-sm"
          style={{ color: "var(--vie-navy)" }}
        >
          Cada dia, una expresion francesa para ampliar tu vocabulario.
        </p>

        <div className="mt-8">
          <MotDuJourFull expression={todayExpression} />
        </div>

        {/* Archive */}
        <section className="mt-12">
          <h2 className="vie-heading text-xl font-semibold">
            Archivo de expresiones
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {recentExpressions.map((expr) => (
              <div key={expr.id} className="vie-card p-4">
                <p
                  className="font-semibold"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {expr.emoji && (
                    <span className="mr-2">{expr.emoji}</span>
                  )}
                  {expr.french}
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  {expr.spanish}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Newsletter */}
        <section className="mt-12">
          <h2 className="vie-heading text-xl font-semibold">
            Recibe la expresion del dia
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            Suscribete para recibir cada manana la expresion del dia en tu
            correo.
          </p>
          <div className="mt-4">
            <NewsletterForm />
          </div>
        </section>
      </div>
    </div>
  );
}
