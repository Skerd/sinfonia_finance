import type {SiteRoomContribution} from "@coreModule/clients/panel/moduleContributions/siteRoomContribution.types.ts";

const financeSiteRoomContribution: SiteRoomContribution = {
    id: "finance",
    order: 25,
    systemSettingsRooms: {
        giftcards: "giftCards_configurations",
    },
};

export default financeSiteRoomContribution;
