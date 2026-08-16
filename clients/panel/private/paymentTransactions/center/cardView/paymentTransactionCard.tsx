import {compose} from "redux";
import withLanguage, {WithLanguageType} from "@coreModule/helpers/hocs/withLanguage.tsx";
import withDebug from "@coreModule/helpers/hocs/withDebug.tsx";
import {IconActivity, IconCreditCard, IconCurrencyDollar, IconTag} from "@tabler/icons-react";
import type {PaymentTransaction} from "armonia/src/modules/finance/api/finance/private/paymentTransaction/paymentTransaction.dto.ts";
import type {DeletedData} from "armonia/src/modules/core/types/shared.types.ts";
import PaymentTransactionSheetView from "@financeModule/clients/panel/private/paymentTransactions/center/sheetView/paymentTransactionSheetView.tsx";
import DisplayRow from "@coreModule/components/custom/displayValue/displayRow.tsx";
import EntityCard from "@coreModule/components/custom/systemCards/entityCard.tsx";
import type {WithAxiosLifecycleRef} from "@coreModule/helpers/hocs/withAxios.tsx";
import type {RefObject} from "react";
import {paymentTransactionTitle} from "../../paymentTransactionDisplay.ts";

type PaymentTransactionCardProps = WithLanguageType & {
    entity: PaymentTransaction;
    fetchId?: string;
    hideActions?: boolean;
    onDelete?: (deleted?: PaymentTransaction, response?: DeletedData) => void;
    onRestore?: () => void;
    sheetOnly?: boolean;
    innerRef?: RefObject<WithAxiosLifecycleRef<PaymentTransaction> | null>;
};

function PaymentTransactionCard({
    entity,
    resolveLanguageKey,
    fetchId,
    hideActions = false,
    onDelete,
    onRestore,
    sheetOnly = false,
    innerRef,
}: PaymentTransactionCardProps) {
    return (
        <EntityCard
            resource="paymentTransactions"
            entity={entity}
            fetchId={fetchId}
            singleUrl="/api/finance/paymentTransaction/single"
            onDelete={onDelete}
            onRestore={onRestore}
            hideActions={hideActions}
            hideEdit
            hideDelete
            hideRestore
            sheetOnly={sheetOnly}
            editPath={() => ""}
            Sheet={PaymentTransactionSheetView}
            sheetEntityProp="entity"
            deleteUrl=""
            restoreUrl=""
            failedTitle=""
            failedDescription=""
            titlePath="gatewayTransactionId"
            innerRef={innerRef}
            sheetProps={() => ({fetchId})}
        >
            {({entity: row}) => (
                <>
                    <EntityCard.Header
                        titlePath="gatewayTransactionId"
                        title={paymentTransactionTitle(row, (type) => {
                            const key = `paymentTransactionType.${type}`;
                            const resolved = resolveLanguageKey(key);
                            return resolved !== key ? String(resolved) : type;
                        })}
                    />
                    <EntityCard.Body>
                        <DisplayRow
                            icon={IconTag}
                            label={resolveLanguageKey("type")}
                            tooltip={resolveLanguageKey("type")}
                            path="type"
                            type="enum"
                            languageKeyCategory="paymentTransactionType"
                            value={row.type}
                        />
                        <DisplayRow
                            icon={IconCreditCard}
                            label={resolveLanguageKey("gateway")}
                            tooltip={resolveLanguageKey("gateway")}
                            path="gateway"
                            type="enum"
                            languageKeyCategory="paymentTransactionGateway"
                            value={row.gateway}
                        />
                        <DisplayRow
                            icon={IconActivity}
                            label={resolveLanguageKey("status")}
                            tooltip={resolveLanguageKey("status")}
                            path="status"
                            type="enum"
                            languageKeyCategory="paymentTransactionStatus"
                            value={row.status}
                        />
                        <DisplayRow
                            icon={IconCurrencyDollar}
                            label={resolveLanguageKey("amount")}
                            tooltip={resolveLanguageKey("amount")}
                            path="amount"
                            type="currency"
                            value={{amount: row.amount, currency: row.currency}}
                        />
                    </EntityCard.Body>
                </>
            )}
        </EntityCard>
    );
}

export default compose(
    withLanguage("src/modules/finance/clients/panel/private/paymentTransactions/center/cardView/paymentTransactionCard.tsx"),
    withDebug(true, true),
)(PaymentTransactionCard);
