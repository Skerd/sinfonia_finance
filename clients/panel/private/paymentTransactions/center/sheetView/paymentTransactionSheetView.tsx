import {compose} from "redux";
import {useEffect, useState} from "react";
import withLanguage, {WithLanguageType} from "@coreModule/helpers/hocs/withLanguage.tsx";
import withDebug from "@coreModule/helpers/hocs/withDebug.tsx";
import {useAccess} from "@coreModule/helpers/hooks/useAccess.ts";
import type {PaymentTransaction} from "armonia/src/modules/finance/api/finance/private/paymentTransaction/paymentTransaction.dto.ts";
import type {DeleteResponse} from "armonia/src/modules/core/types/shared.types.ts";
import {useViewConfig} from "@coreModule/helpers/hooks/useViewConfig.ts";
import SheetViewRenderer from "@coreModule/components/viewEngine/SheetViewRenderer.tsx";
import {paymentTransactionTitle} from "../../paymentTransactionDisplay.ts";

export type PaymentTransactionSheetViewOwnProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    entity?: PaymentTransaction;
    hideActions?: boolean;
    onDelete?: (response?: DeleteResponse) => void;
    onRestore?: () => void;
    fetchId?: string;
};

function withSheetTitle(tx: PaymentTransaction, resolveLanguageKey: WithLanguageType["resolveLanguageKey"]) {
    return {
        ...tx,
        // Client-only header label — not part of the API DTO.
        displayTitle: paymentTransactionTitle(tx, (type) => {
            const key = `paymentTransactionType.${type}`;
            const resolved = resolveLanguageKey(key);
            return resolved !== key ? String(resolved) : type;
        }),
    };
}

function PaymentTransactionSheetView({
    open,
    onOpenChange,
    entity: entityProp,
    resolveLanguageKey,
    hideActions = false,
    onDelete = () => {},
    onRestore = () => {},
    fetchId,
}: PaymentTransactionSheetViewOwnProps & WithLanguageType) {
    const [sheetData, setSheetData] = useState<Record<string, unknown>>(
        entityProp ? withSheetTitle(entityProp, resolveLanguageKey) : {_id: fetchId},
    );
    const access = useAccess("paymentTransactions");
    const viewConfig = useViewConfig("paymentTransactions", "sheet");

    useEffect(() => {
        if (!entityProp) return;
        setSheetData(withSheetTitle(entityProp, resolveLanguageKey));
    }, [entityProp, resolveLanguageKey]);

    const entityId = entityProp?._id ?? fetchId;

    if (!viewConfig) return null;
    if (!entityId) return null;

    return (
        <SheetViewRenderer
            config={viewConfig}
            url="/api/finance/paymentTransaction/single"
            fetchId={fetchId ?? entityProp?._id}
            onDataFetched={(data) => {
                setSheetData(withSheetTitle(data as PaymentTransaction, resolveLanguageKey));
            }}
            data={sheetData}
            open={open}
            onOpenChange={onOpenChange}
            resolveLanguageKey={resolveLanguageKey}
            access={access}
            hideActions={hideActions}
            hideEdit
            hideDelete
            onDelete={onDelete}
            onRestore={onRestore}
        />
    );
}

export default compose(
    withLanguage("src/modules/finance/clients/panel/private/paymentTransactions/center/sheetView/paymentTransactionSheetView.tsx"),
    withDebug(true, true, "paymentTransactions"),
)(PaymentTransactionSheetView);
