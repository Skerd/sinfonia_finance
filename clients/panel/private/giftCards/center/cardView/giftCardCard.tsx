import {compose} from "redux";
import withLanguage, {WithLanguageType} from "@coreModule/helpers/hocs/withLanguage.tsx";
import withDebug from "@coreModule/helpers/hocs/withDebug.tsx";
import HiddenElement from "@coreModule/components/custom/hiddenElement.tsx";
import {useAccess} from "@coreModule/helpers/hocs/withAccess.tsx";
import {useState} from "react";
import {cn} from "@coreModule/components/lib/utils.ts";
import DeletedInfo from "@coreModule/components/custom/deletedInfo";
import InfoRow from "@coreModule/components/custom/infoRow.tsx";
import {IconCurrencyDollar, IconTag, IconUser} from "@tabler/icons-react";
import GiftCardSheetView from "@financeModule/clients/panel/private/giftCards/center/sheetView/giftCardSheetView.tsx";
import DeleteAction from "@coreModule/components/custom/actions/deleteAction.tsx";
import RestoreAction from "@coreModule/components/custom/actions/restoreAction.tsx";
import type {DeletedData} from "armonia/src/modules/core/types/shared.types.ts";
import ActionMenu from "@coreModule/components/custom/actions/menu/actionMenu.tsx";
import EnableGiftCard from "@financeModule/clients/panel/private/giftCards/center/actions/enableGiftCard.tsx";
import DisableGiftCard from "@financeModule/clients/panel/private/giftCards/center/actions/disableGiftCard.tsx";
import EnableGiftCardDialog from "@financeModule/clients/panel/private/giftCards/center/dialogs/enableGiftCardDialog.tsx";
import DisableGiftCardDialog from "@financeModule/clients/panel/private/giftCards/center/dialogs/disableGiftCardDialog.tsx";
import {InfoRowGroup} from "@coreModule/components/custom/infoRowGroup.tsx";
import {useEntityCard} from "@coreModule/helpers/hooks/useEntityCard.ts";
import {EntityCardShell} from "@coreModule/components/custom/cards/EntityCardShell.tsx";
import {EntityTextCardHeader} from "@coreModule/components/custom/cards/EntityTextCardHeader.tsx";
import {CARD_BODY_CLASS} from "@coreModule/components/custom/cards/entityCard.constants.ts";
import {Separator} from "@coreModule/components/ui/separator.tsx";

export type GiftCardEntity = {
    _id: string;
    code: string;
    initialBalance: number;
    balance: number;
    status: string;
    currency?: {symbol?: string; abbreviation?: string};
    purchasedBy?: {name?: string; surname?: string};
    deletedAt?: string;
    deletedBy?: unknown;
};

type GiftCardCardProps = WithLanguageType & {
    entity: GiftCardEntity;
    onDelete?: (deleted?: GiftCardEntity, response?: DeletedData) => void;
    onRestore?: () => void;
    hideActions?: boolean;
};

function GiftCardCard({
    entity: entityProp,
    resolveLanguageKey,
    onDelete: onDeleteProp,
    onRestore: onRestoreProp,
    hideActions = false,
}: GiftCardCardProps) {
    const {action, setAction, entity: entity, setEntity, hideAfterDeletion, onDelete, onRestore} = useEntityCard({
        entityProp: entityProp,
        onDeleteProp,
        onRestoreProp,
    });

    const {read, restore} = useAccess("giftCards");


    if (hideAfterDeletion) {
        return <></>;
    }
    if (!restore && entity.deletedAt != null) {
        return <></>;
    }
    if (!read || !Object.keys(read).length) {
        return <HiddenElement />;
    }

    const symbol = entity.currency?.symbol ?? entity.currency?.abbreviation ?? "";
    const buyerName = [entity.purchasedBy?.name, entity.purchasedBy?.surname].filter(Boolean).join(" ");

    return (
        <>
            <EntityCardShell onClick={() => setAction("view")}>
                <div className="flex w-full items-stretch">
                    {((read as any).deletedBy || (read as any).deletedAt) && (
                        <DeletedInfo deletedAt={entity.deletedAt as any} deletedBy={entity.deletedBy as any} />
                    )}
                    <div className="w-full min-w-0">
                        <EntityTextCardHeader
                            title={<span className="font-mono">{entity.code}</span>}
                            showTitle
                            hideActions={hideActions}
                            actionMenu={
                                <ActionMenu
                                    accessModel={"giftCards"}
                                    deletedData={entity}
                                    onAction={(a: string) => setAction(a)}
                                    editPath=""
                                    hideEdit
                                    allowMenuForCustomChildren
                                >
                                    <EnableGiftCard entity={entity} onAction={(a: string) => setAction(a)} />
                                    <DisableGiftCard entity={entity} onAction={(a: string) => setAction(a)} />
                                </ActionMenu>
                            }
                        />
                        <div className={CARD_BODY_CLASS}>
                            <Separator />
                            <InfoRowGroup>
                                <InfoRow
                                    label={resolveLanguageKey("status")}
                                    icon={IconTag}
                                    show={!!(read as any)?.status}
                                    value={entity.status ? resolveLanguageKey("giftCardStatus." + entity.status) : undefined}
                                />
                                <InfoRow
                                    label={resolveLanguageKey("balance")}
                                    icon={IconCurrencyDollar}
                                    show={!!(read as any)?.balance}
                                    value={entity.balance != null ? `${symbol} ${entity.balance.toFixed(2)} / ${entity.initialBalance.toFixed(2)}`.trim() : undefined}
                                />
                                <InfoRow
                                    label={resolveLanguageKey("purchasedBy")}
                                    icon={IconUser}
                                    show={!!(read as any)?.purchasedBy}
                                    value={buyerName || undefined}
                                />
                            </InfoRowGroup>
                        </div>
                    </div>
                </div>
            </EntityCardShell>

            {!!action && (
                <>
                    {action === "view" && (
                        <GiftCardSheetView
                            open={action === "view"}
                            onOpenChange={() => setAction("")}
                            entity={entity}
                            fetchId={entity._id}
                            onDelete={onDelete}
                            onRestore={onRestore}
                            onSheetRowPatched={(row: Partial<GiftCardEntity>) => setEntity(row as GiftCardEntity)}
                        />
                    )}
                    {action === "delete" && (
                        <DeleteAction
                            accessModel={"giftCards"}
                            deleteId={entity._id}
                            openAlert={action === "delete"}
                            name={entity.code}
                            confirmName={entity.code}
                            onSuccess={onDelete}
                            onCancel={() => setAction("")}
                            url="/api/finance/giftCard"
                        />
                    )}
                    {action === "restore" && (
                        <RestoreAction
                            accessModel={"giftCards"}
                            deleteId={entity._id}
                            openAlert={action === "restore"}
                            name={entity.code}
                            confirmName={entity.code}
                            onSuccess={onRestore}
                            onCancel={() => setAction("")}
                            url="/api/finance/giftCard/restore"
                        />
                    )}
                    {action === "enableGiftCard" && (
                        <EnableGiftCardDialog
                            open={true}
                            onClose={() => setAction("")}
                            entity={entity}
                            onSuccess={(row: GiftCardEntity) => setEntity(row)}
                        />
                    )}
                    {action === "disableGiftCard" && (
                        <DisableGiftCardDialog
                            open={true}
                            onClose={() => setAction("")}
                            entity={entity}
                            onSuccess={(row: GiftCardEntity) => setEntity(row)}
                        />
                    )}
                </>
            )}
        </>
    );
}

export default compose(
    withLanguage("src/modules/finance/clients/panel/private/giftCards/center/cardView/giftCardCard.tsx"),
    withDebug(true, true),
)(GiftCardCard);
