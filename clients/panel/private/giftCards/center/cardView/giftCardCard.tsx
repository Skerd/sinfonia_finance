import {compose} from "redux";
import withLanguage, {WithLanguageType} from "@coreModule/helpers/hocs/withLanguage.tsx";
import withDebug from "@coreModule/helpers/hocs/withDebug.tsx";
import {IconCurrencyDollar, IconTag, IconUser} from "@tabler/icons-react";
import GiftCardSheetView from "@financeModule/clients/panel/private/giftCards/center/sheetView/giftCardSheetView.tsx";
import type {DeletedData} from "armonia/src/modules/core/types/shared.types.ts";
import EnableGiftCard from "@financeModule/clients/panel/private/giftCards/center/actions/enableGiftCard.tsx";
import DisableGiftCard from "@financeModule/clients/panel/private/giftCards/center/actions/disableGiftCard.tsx";
import EnableGiftCardDialog from "@financeModule/clients/panel/private/giftCards/center/dialogs/enableGiftCardDialog.tsx";
import DisableGiftCardDialog from "@financeModule/clients/panel/private/giftCards/center/dialogs/disableGiftCardDialog.tsx";
import DisplayRow from "@coreModule/components/custom/displayValue/displayRow.tsx";
import EntityCard from "@coreModule/components/custom/systemCards/entityCard.tsx";
import type {WithAxiosLifecycleRef} from "@coreModule/helpers/hocs/withAxios.tsx";
import type {RefObject} from "react";

export type GiftCardEntity = DeletedData & {
    _id: string;
    code: string;
    initialBalance: number;
    balance: number;
    status: string;
    currency?: {symbol?: string; abbreviation?: string};
    purchasedBy?: {name?: string; surname?: string};
};

type GiftCardCardProps = WithLanguageType & {
    entity: GiftCardEntity;
    fetchId?: string;
    hideActions?: boolean;
    onDelete?: (deleted?: GiftCardEntity, response?: DeletedData) => void;
    onRestore?: () => void;
    sheetOnly?: boolean;
    innerRef?: RefObject<WithAxiosLifecycleRef<GiftCardEntity> | null>;
};

function GiftCardCard({
    entity,
    resolveLanguageKey,
    fetchId,
    hideActions = false,
    onDelete,
    onRestore,
    sheetOnly = false,
    innerRef,
}: GiftCardCardProps) {
    return (
        <EntityCard
            resource="giftCards"
            entity={entity}
            fetchId={fetchId}
            singleUrl="/api/finance/giftCard/single"
            onDelete={onDelete}
            onRestore={onRestore}
            hideActions={hideActions}
            hideEdit
            sheetOnly={sheetOnly}
            editPath={() => ""}
            Sheet={GiftCardSheetView}
            sheetEntityProp="entity"
            deleteUrl="/api/finance/giftCard"
            restoreUrl="/api/finance/giftCard/restore"
            failedTitle=""
            failedDescription=""
            titlePath="code"
            innerRef={innerRef}
            sheetProps={({entity: row, setEntity}) => ({
                fetchId,
                onSheetRowPatched: (patched: Partial<GiftCardEntity>) => {
                    setEntity({...row, ...patched});
                },
            })}
            extraDialogs={({action, setAction, entity: row, setEntity}) => (
                <>
                    {action === "enableGiftCard" && (
                        <EnableGiftCardDialog
                            open
                            onClose={() => setAction("")}
                            entity={row}
                            onSuccess={(updated) => setEntity({...row, ...updated})}
                        />
                    )}
                    {action === "disableGiftCard" && (
                        <DisableGiftCardDialog
                            open
                            onClose={() => setAction("")}
                            entity={row}
                            onSuccess={(updated) => setEntity({...row, ...updated})}
                        />
                    )}
                </>
            )}
        >
            {({entity: row, setAction}) => (
                <>
                    <EntityCard.Header
                        titlePath="code"
                        title={<span className="font-mono">{row.code}</span>}
                    >
                        <EnableGiftCard entity={row} onAction={setAction} />
                        <DisableGiftCard entity={row} onAction={setAction} />
                    </EntityCard.Header>
                    <EntityCard.Body>
                        <DisplayRow
                            icon={IconTag}
                            label={resolveLanguageKey("status")}
                            tooltip={resolveLanguageKey("status")}
                            path="status"
                            value={row.status ? resolveLanguageKey("giftCardStatus." + row.status) : null}
                        />
                        <DisplayRow
                            icon={IconCurrencyDollar}
                            label={resolveLanguageKey("initialBalance")}
                            tooltip={resolveLanguageKey("initialBalance")}
                            path="initialBalance"
                            type="currency"
                            value={{amount: row.initialBalance, currency: row.currency}}
                        />
                        <DisplayRow
                            icon={IconCurrencyDollar}
                            label={resolveLanguageKey("balance")}
                            tooltip={resolveLanguageKey("balance")}
                            path="balance"
                            type="currency"
                            value={{amount: row.balance, currency: row.currency}}
                        />
                        <DisplayRow
                            icon={IconUser}
                            label={resolveLanguageKey("purchasedBy")}
                            tooltip={resolveLanguageKey("purchasedBy")}
                            path="purchasedBy"
                            type="user"
                            value={row.purchasedBy}
                        />
                    </EntityCard.Body>
                </>
            )}
        </EntityCard>
    );
}

export default compose(
    withLanguage("src/modules/finance/clients/panel/private/giftCards/center/cardView/giftCardCard.tsx"),
    withDebug(true, true),
)(GiftCardCard);
