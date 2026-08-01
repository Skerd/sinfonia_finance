import type {TenancySettingsContribution} from "@coreModule/clients/panel/moduleContributions/tenancySettingsContribution.types.ts";
import {buildFinanceTenancySettingsSubCollapsible} from "@financeModule/clients/panel/financeTenancyNav.ts";

const financeTenancySettingsContribution: TenancySettingsContribution = {
    id: "finance",
    order: 30,
    getTenancySettingsItems: buildFinanceTenancySettingsSubCollapsible,
};

export default financeTenancySettingsContribution;
