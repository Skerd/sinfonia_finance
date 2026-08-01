import {compose} from "redux";
import withLanguage, {WithLanguageType} from "@coreModule/helpers/hocs/withLanguage.tsx";
import withDebug from "@coreModule/helpers/hocs/withDebug.tsx";
import EntityListPage from "@coreModule/components/entityPage/EntityListPage.tsx";
import type {PaymentTransaction} from "armonia/src/modules/finance/api/finance/private/paymentTransaction/paymentTransaction.dto.ts";
import type {DeletedData} from "armonia/src/modules/core/types/shared.types.ts";
import PaymentTransactionCard from "./center/cardView/paymentTransactionCard.tsx";
import PaymentTransactionSheetView from "./center/sheetView/paymentTransactionSheetView.tsx";

function AllPaymentTransactions({resolveLanguageKey}: WithLanguageType) {
    return (
        <EntityListPage<PaymentTransaction>
            apiUrl="/api/finance/paymentTransaction"
            collectionName="paymentTransactions"
            accessModel="paymentTransactions"
            tableConfigKey="paymentTransactions"
            hideCreate
            buildEditPath={() => ""}
            rowActionMenu={{hideEdit: true}}
            resolveLanguageKey={resolveLanguageKey}
            sheetLanguagePath="src/modules/finance/clients/panel/private/paymentTransactions/center/sheetView/paymentTransactionSheetView.tsx"
            cardViewClassName="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            renderSheet={({open, onOpenChange, entity, fetchId, onDelete, onRestore}) => (
                <PaymentTransactionSheetView
                    open={open}
                    onOpenChange={onOpenChange}
                    entity={entity}
                    fetchId={fetchId}
                    onDelete={onDelete}
                    onRestore={onRestore}
                />
            )}
            renderCard={(entity, onDelete, onRestore) => (
                <PaymentTransactionCard
                    entity={entity}
                    onDelete={(row: PaymentTransaction | undefined, response?: DeletedData) => onDelete(row, response)}
                    onRestore={() => onRestore(entity)}
                />
            )}
        />
    );
}

export default compose(
    withLanguage("src/modules/finance/clients/panel/private/paymentTransactions/index.tsx"),
    withDebug(true, true),
)(AllPaymentTransactions);
