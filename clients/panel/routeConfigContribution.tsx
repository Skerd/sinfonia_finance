import EscrowDashboard from "@financeModule/clients/panel/private/escrowDashboard/index.tsx";
import AllPaymentTransactions from "@financeModule/clients/panel/private/paymentTransactions/index.tsx";
import AllGiftCards from "@financeModule/clients/panel/private/giftCards/index.tsx";
import type {
    RouteConfigArgs,
    RouteConfigContribution,
} from "@coreModule/helpers/types/routeConfigContribution.types.ts";

const financeRouteConfigContribution: RouteConfigContribution = {
    id: "finance",
    order: 25,
    contributeRoutes({menu, subview, segments}: RouteConfigArgs) {
        if (menu === "tenancy" && subview === "systemSettings") {
            const resource = segments[2];
            if (resource === "giftcards") {
                return <AllGiftCards />;
            }
            return undefined;
        }

        if (menu !== "finance") return undefined;
        if (subview === "escrowdashboard") return <EscrowDashboard />;
        if (subview === "paymenttransactions") return <AllPaymentTransactions />;
        return undefined;
    },
};

export default financeRouteConfigContribution;
