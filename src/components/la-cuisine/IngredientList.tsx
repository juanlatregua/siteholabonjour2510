import type { Ingredient } from "@/data/recipes/recipes";

export default function IngredientList({ ingredients }: { ingredients: Ingredient[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr
            className="border-b-2"
            style={{ borderColor: "var(--vie-gold-light)" }}
          >
            <th
              className="px-4 py-3 font-semibold"
              style={{ color: "var(--vie-navy)", fontFamily: "var(--font-display)" }}
            >
              Cantidad
            </th>
            <th
              className="px-4 py-3 font-semibold"
              style={{ color: "var(--vie-navy)", fontFamily: "var(--font-display)" }}
            >
              Francais
            </th>
            <th
              className="px-4 py-3 font-semibold"
              style={{ color: "var(--vie-navy)", fontFamily: "var(--font-display)" }}
            >
              Espanol
            </th>
          </tr>
        </thead>
        <tbody>
          {ingredients.map((item, idx) => (
            <tr
              key={idx}
              className="border-b border-gray-100 transition-colors hover:bg-gray-50"
            >
              <td
                className="px-4 py-3 font-medium"
                style={{ color: "var(--vie-wine)" }}
              >
                {item.quantity}
              </td>
              <td
                className="px-4 py-3 font-medium"
                style={{ color: "var(--vie-bleu)" }}
              >
                {item.french}
              </td>
              <td className="px-4 py-3 text-gray-700">{item.spanish}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
