import type {PaymentTransaction} from "armonia/src/modules/finance/api/finance/private/paymentTransaction/paymentTransaction.dto.ts";
import {formatNumber} from "@coreModule/helpers/general/numbers.ts";

/** Client-side amount label from amount + currency (not a DTO field). */
export function formatPaymentAmount(tx: Pick<PaymentTransaction, "amount" | "currency">): string {
    const n = typeof tx.amount === "number" ? tx.amount : Number(tx.amount);
    const formatted = Number.isFinite(n)
        ? formatNumber(n, {minimumFractionDigits: 2, maximumFractionDigits: 2})
        : String(tx.amount ?? "");
    const prefix =
        tx.currency?.symbol?.trim() ||
        tx.currency?.abbreviation?.trim() ||
        tx.currency?.code?.trim();
    return prefix ? `${prefix} ${formatted}` : formatted;
}

/** Sheet/card title: gateway id, else type · amount, else id. */
export function paymentTransactionTitle(
    tx: Pick<PaymentTransaction, "_id" | "gatewayTransactionId" | "type" | "amount" | "currency">,
    resolveType?: (type: string) => string,
): string {
    if (typeof tx.gatewayTransactionId === "string" && tx.gatewayTransactionId.trim()) {
        return tx.gatewayTransactionId.trim();
    }
    const typeLabel = tx.type
        ? resolveType?.(tx.type) ?? tx.type
        : "";
    const amount = formatPaymentAmount(tx);
    return [typeLabel, amount].filter(Boolean).join(" · ") || tx._id;
}
