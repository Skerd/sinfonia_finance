import {compose} from "redux";
import withLanguage, {WithLanguageType} from "@coreModule/helpers/hocs/withLanguage.tsx";
import withDebug from "@coreModule/helpers/hocs/withDebug.tsx";
import HiddenElement from "@coreModule/components/custom/hiddenElement.tsx";
import {useAccess} from "@coreModule/helpers/hocs/withAccess.tsx";
import {useState} from "react";
import TooltipDisplayer from "@coreModule/components/custom/tooltipDisplayer.tsx";
import ValueNotSet from "@coreModule/components/custom/valueNotSet.tsx";
import {cn} from "@coreModule/components/lib/utils.ts";
import type {PaymentTransaction} from "armonia/src/modules/finance/api/finance/private/paymentTransaction/paymentTransaction.dto.ts";
import DeletedInfo from "@coreModule/components/custom/deletedInfo";
import InfoRow from "@coreModule/components/custom/infoRow.tsx";
import {IconCreditCard, IconActivity, IconCurrencyDollar, IconTag} from "@tabler/icons-react";
import PaymentTransactionSheetView from "@financeModule/clients/panel/private/paymentTransactions/center/sheetView/paymentTransactionSheetView.tsx";
import type {DeletedData} from "armonia/src/modules/core/types/shared.types.ts";
import ActionMenu from "@coreModule/components/custom/actions/menu/actionMenu.tsx";
import {InfoRowGroup} from "@coreModule/components/custom/infoRowGroup.tsx";
import {useEntityCard} from "@coreModule/helpers/hooks/useEntityCard.ts";
import {EntityCardShell} from "@coreModule/components/custom/cards/EntityCardShell.tsx";
import {EntityTextCardHeader} from "@coreModule/components/custom/cards/EntityTextCardHeader.tsx";
import {CARD_BODY_CLASS} from "@coreModule/components/custom/cards/entityCard.constants.ts";
import {Separator} from "@coreModule/components/ui/separator.tsx";
import {
    formatPaymentAmount,
    paymentTransactionTitle,
} from "../../paymentTransactionDisplay.ts";

type PaymentTransactionCardProps = WithLanguageType & {
    entity: PaymentTransaction;
    onDelete?: (deleted?: PaymentTransaction, response?: DeletedData) => void;
    onRestore?: () => void;
    hideActions?: boolean;
    sheetOnly?: boolean;
};

function PaymentTransactionCard({
    entity: entityProp,
    resolveLanguageKey,
    onDelete: onDeleteProp,
    onRestore: onRestoreProp,
    hideActions = false,
    sheetOnly = false,
}: PaymentTransactionCardProps) {
    const {action, setAction, entity: entity, setEntity, hideAfterDeletion, onDelete, onRestore} = useEntityCard({
        entityProp: entityProp,
        onDeleteProp,
        onRestoreProp,
    });

    const {read, restore} = useAccess("paymentTransactions");


    if (hideAfterDeletion) {
        return <></>;
    }
    if (!restore && (entity as any).deletedAt != null) {
        return <></>;
    }
    if (!read || !Object.keys(read).length) {
        return <HiddenElement />;
    }

    return (
        <>
            {!sheetOnly && (
                <EntityCardShell onClick={() => setAction("view")}>
                    <div className="flex w-full items-stretch">
                        {((read as any).deletedBy || (read as any).deletedAt) && (
                            <DeletedInfo deletedAt={(entity as any).deletedAt} deletedBy={(entity as any).deletedBy} />
                        )}
                        <div className="w-full min-w-0">
                            <EntityTextCardHeader
                                title={null}
                                showTitle={true}
                                badges={undefined}
                                showBadges={false}
                                hideActions={hideActions}
                                actionMenu={
                                    undefined
                                }
                            />
                            <div className={CARD_BODY_CLASS}>
                                <Separator />
                                <div className="flex flex-col gap-y-1">
                                    <InfoRowGroup>
<InfoRow
                                        label={resolveLanguageKey("type")}
                                        icon={IconTag}
                                        show={!!(read as any)?.type}
                                        value={
                                            (entity as any).type != null
                                                ? (() => {
                                                      const key = `paymentTransactionType.${String((entity as any).type)}`;
                                                      const resolved = resolveLanguageKey(key);
                                                      return resolved !== key ? resolved : String((entity as any).type);
                                                  })()
                                                : undefined
                                        }
                                    />
                                </InfoRowGroup>
                                    <InfoRow
                                        label={resolveLanguageKey("gateway")}
                                        icon={IconCreditCard}
                                        show={!!(read as any)?.gateway}
                                        value={
                                            (entity as any).gateway != null
                                                ? (() => {
                                                      const key = `paymentTransactionGateway.${String((entity as any).gateway)}`;
                                                      const resolved = resolveLanguageKey(key);
                                                      return resolved !== key ? resolved : String((entity as any).gateway);
                                                  })()
                                                : undefined
                                        }
                                    />
                                    <InfoRow
                                        label={resolveLanguageKey("status")}
                                        icon={IconActivity}
                                        show={!!(read as any)?.status}
                                        value={
                                            (entity as any).status != null
                                                ? (() => {
                                                      const key = `paymentTransactionStatus.${String((entity as any).status)}`;
                                                      const resolved = resolveLanguageKey(key);
                                                      return resolved !== key ? resolved : String((entity as any).status);
                                                  })()
                                                : undefined
                                        }
                                    />
                                    <InfoRow
                                        label={resolveLanguageKey("amount")}
                                        icon={IconCurrencyDollar}
                                        show={!!(read as any)?.amount}
                                        value={
                                            entity.amount != null
                                                ? formatPaymentAmount(entity)
                                                : undefined
                                        }
                                    />
                            </div>
                        </div>
                        </div>
                    </div>
                </EntityCardShell>
            )}

            {!!action && (
                <>
                    {action === "view" && (
                        <PaymentTransactionSheetView
                            open={action === "view"}
                            onOpenChange={() => setAction("")}
                            entity={entity}
                            fetchId={entity._id}
                            onDelete={onDelete}
                            onRestore={onRestore}
                        />
                    )}
                </>
            )}
        </>
    );
}

export default compose(
    withLanguage("src/modules/finance/clients/panel/private/paymentTransactions/center/cardView/paymentTransactionCard.tsx"),
    withDebug(true, true),
)(PaymentTransactionCard);
