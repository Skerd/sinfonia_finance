import EscrowDashboard from "@financeModule/clients/panel/private/escrowDashboard/index.tsx";
import type {
    RouteConfigArgs,
    RouteConfigContribution,
} from "@coreModule/clients/panel/moduleContributions/routeConfigContribution.types.ts";

const financeRouteConfigContribution: RouteConfigContribution = {
    id: "finance",
    order: 25,
    contributeRoutes({menu, subview}: RouteConfigArgs) {
        if (menu !== "finance") return undefined;
        if (subview === "escrowdashboard") return <EscrowDashboard />;
        return undefined;
    },
};

export default financeRouteConfigContribution;
