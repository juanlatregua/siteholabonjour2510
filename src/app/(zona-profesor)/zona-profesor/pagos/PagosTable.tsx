"use client";

import React, { useState } from "react";
import PaymentRow from "@/components/zona/PaymentRow";

import Button from "@/components/ui/Button";
import Card, { CardContent } from "@/components/ui/Card";

interface PaymentData {
  id: string;
  amount: number;
  method: string;
  status: string;
  reference: string | null;
  createdAt: string;
  confirmedAt: string | null;
  studentName: string;
}

interface PagosTableProps {
  payments: PaymentData[];
}

export default function PagosTable({ payments }: PagosTableProps) {
  const [paymentList, setPaymentList] = useState(payments);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  async function handleAction(paymentId: string, action: "CONFIRMED" | "REJECTED") {
    setLoadingId(paymentId);
    try {
      const res = await fetch(`/api/zona-profesor/pagos/${paymentId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: action }),
      });

      const data = await res.json();

      if (res.ok && data.ok) {
        setPaymentList((prev) =>
          prev.map((p) =>
            p.id === paymentId
              ? {
                  ...p,
                  status: action,
                  confirmedAt: action === "CONFIRMED" ? new Date().toISOString() : p.confirmedAt,
                }
              : p
          )
        );
      }
    } catch {
      // Silently fail, user can retry
    } finally {
      setLoadingId(null);
    }
  }

  return (
    <Card padding={false}>
      <CardContent>
        <div className="divide-y divide-gray-100">
          {paymentList.map((payment) => (
            <div key={payment.id} className="flex flex-wrap items-center gap-3 px-4 py-3">
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-gray-500 mb-1">
                  {payment.studentName}
                </p>
                <PaymentRow
                  amount={payment.amount}
                  method={payment.method}
                  status={payment.status}
                  reference={payment.reference}
                  createdAt={payment.createdAt}
                  confirmedAt={payment.confirmedAt}
                />
              </div>
              {payment.status === "PENDING" && (
                <div className="flex gap-2">
                  <Button
                    variant="primary"
                    size="sm"
                    loading={loadingId === payment.id}
                    onClick={() => handleAction(payment.id, "CONFIRMED")}
                  >
                    Confirmar
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    loading={loadingId === payment.id}
                    onClick={() => handleAction(payment.id, "REJECTED")}
                  >
                    Rechazar
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
