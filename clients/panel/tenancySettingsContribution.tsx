import type {TenancySettingsContribution} from "@coreModule/helpers/types/tenancySettingsContribution.types.ts";
import {buildFinanceTenancySettingsSubCollapsible} from "@financeModule/clients/panel/financeTenancyNav.ts";

const financeTenancySettingsContribution: TenancySettingsContribution = {
    id: "finance",
    order: 30,
    getTenancySettingsItems: buildFinanceTenancySettingsSubCollapsible,
};

export default financeTenancySettingsContribution;
