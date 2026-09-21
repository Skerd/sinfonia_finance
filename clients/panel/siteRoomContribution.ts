import type {SiteRoomContribution} from "@coreModule/helpers/types/siteRoomContribution.types.ts";

const financeSiteRoomContribution: SiteRoomContribution = {
    id: "finance",
    order: 25,
    systemSettingsRooms: {
        giftcards: "giftCards_configurations",
    },
};

export default financeSiteRoomContribution;
