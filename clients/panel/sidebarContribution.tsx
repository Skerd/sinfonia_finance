import {CreditCard, DollarSign} from "lucide-react";
import type {SidebarContribution} from "@coreModule/clients/panel/moduleContributions/sidebarContribution.types.ts";
import type {NavGroup, NavItem} from "@coreModule/helpers/panel/sidebarNav.types.ts";
import type {ResolveLanguageKey} from "@coreModule/helpers/hocs/withLanguage.tsx";

const financeSidebarContribution: SidebarContribution = {
    id: "finance",
    order: 25,
    getNavGroups(resolveLanguageKey: ResolveLanguageKey): NavGroup[] {
        const items: NavItem[] = [
            {
                title: resolveLanguageKey("menus.finance.escrowDashboard.title") || "Escrow",
                url: "/finance/escrowdashboard",
                icon: DollarSign,
                permissions: [],
                usersPermissions: [],
                atLeastOnePermission: true,
            },
            {
                title: resolveLanguageKey("menus.finance.paymenttransactions.title") || "Payment transactions",
                url: "/finance/paymenttransactions",
                icon: CreditCard,
                permissions: [],
                usersPermissions: [],
                atLeastOnePermission: true,
            },
        ];
        return [
            {
                title: resolveLanguageKey("menus.finance.title") || "Finance",
                permissions: [],
                usersPermissions: [],
                atLeastOnePermission: true,
                items,
            },
        ];
    },
};

export default financeSidebarContribution;
