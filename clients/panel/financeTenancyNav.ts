import {DollarSign, Gift} from "lucide-react";
import type {ResolveLanguageKey} from "@coreModule/helpers/hocs/withLanguage.tsx";
import type {NavSubCollapsible} from "@coreModule/helpers/panel/sidebarNav.types.ts";

/** Nested under Tenancy → Configurations (owned by finance). */
export function buildFinanceTenancySettingsSubCollapsible(
    resolveLanguageKey: ResolveLanguageKey,
): NavSubCollapsible {
    return {
        title: resolveLanguageKey("menus.tenancy.systemSettings.finance.title") || resolveLanguageKey("menus.finance.title") || "Finance",
        icon: DollarSign,
        permissions: [],
        usersPermissions: [],
        atLeastOnePermission: true,
        items: [
            {
                title: resolveLanguageKey("menus.tenancy.systemSettings.giftcards.title") || resolveLanguageKey("menus.finance.giftcards.title") || "Gift cards",
                url: "/tenancy/systemSettings/giftcards",
                icon: Gift,
                permissions: [],
                usersPermissions: [],
                atLeastOnePermission: true,
            },
        ],
    };
}
