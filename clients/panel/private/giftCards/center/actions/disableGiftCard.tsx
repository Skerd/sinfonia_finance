import {compose} from "redux";
import withLanguage, {WithLanguageType} from "@coreModule/helpers/hocs/withLanguage.tsx";
import withDebug from "@coreModule/helpers/hocs/withDebug.tsx";
import {useAccess} from "@coreModule/helpers/context/accessContext.tsx";
import {DropdownMenuItem} from "@coreModule/components/ui/dropdown-menu.tsx";
import {PowerOff} from "lucide-react";

type DisableGiftCardProps = WithLanguageType & {
    entity: {_id: string; status: string};
    onAction: (action: string) => void;
};

function DisableGiftCard({entity, resolveLanguageKey, onAction}: DisableGiftCardProps) {
    const {write} = useAccess("giftCards");

    if (!write?.status) return null;
    if (entity.status !== "active") return null;

    return (
        <DropdownMenuItem onClick={() => onAction("disableGiftCard")}>
            <PowerOff className="text-destructive" size={16} />
            {resolveLanguageKey("title")}
        </DropdownMenuItem>
    );
}

export default compose(
    withLanguage("src/modules/finance/clients/panel/private/giftCards/center/actions/disableGiftCard.tsx"),
    withDebug(true, true, "giftCards"),
)(DisableGiftCard);
