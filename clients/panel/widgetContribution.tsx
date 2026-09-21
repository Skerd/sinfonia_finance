import {lazy} from "react";
import type {WidgetContribution} from "@coreModule/helpers/types/widgetContribution.types.ts";

const PaymentTransactionSheetViewLazy = lazy(
    () =>
        import(
            "@financeModule/clients/panel/private/paymentTransactions/center/sheetView/paymentTransactionSheetView.tsx"
        ),
);
const PaymentTransactionCardLazy = lazy(
    () =>
        import(
            "@financeModule/clients/panel/private/paymentTransactions/center/cardView/paymentTransactionCard.tsx"
        ),
);
const GiftCardSheetViewLazy = lazy(
    () => import("@financeModule/clients/panel/private/giftCards/center/sheetView/giftCardSheetView.tsx"),
);
const GiftCardCardLazy = lazy(
    () => import("@financeModule/clients/panel/private/giftCards/center/cardView/giftCardCard.tsx"),
);

const financeWidgetContribution: WidgetContribution = {
    id: "finance",
    order: 25,
    widgets: {
        "#PaymentTransactionSheetView": PaymentTransactionSheetViewLazy,
        "#PaymentTransactionCard": PaymentTransactionCardLazy,
        "#GiftCardSheetView": GiftCardSheetViewLazy,
        "#GiftCardCard": GiftCardCardLazy,
    },
    referencesDefaultItemProps: {
        "#PaymentTransactionCard": "entity",
        "#GiftCardCard": "entity",
    },
    auditSinglePostHints: {
        "#PaymentTransactionSheetView": {
            url: "/api/finance/paymentTransaction/single",
            labelFields: ["gatewayTransactionId", "type", "status"],
        },
        "#GiftCardSheetView": {url: "/api/finance/giftCard/single", labelFields: ["code"]},
    },
};

export default financeWidgetContribution;
