import { createContext, useContext } from "react";
import type { GetSession } from "types/atproto/session";
import type { CampsiteViewWithDomain } from "types/campground/campsites";
import type { CampgroundProfileRecord } from "types/campground/user";

export const useMeContext = () => {
    const account = useAccount();
    console.log("Account", account);

    return account?.authenticated ? account.profile : null; 
};
export const useAccount = <T extends boolean = false>() => useContext(AccountContext) as (T extends true ? AccountContextAuthenticated : AccountContext);
export const AccountContext = createContext<AccountContext | null>(null);
export type AccountContext = AccountContextAuthenticated | AccountContextUnauthenticated;
export interface AccountContextAuthenticated {
    authenticated: true;
    profile: CampgroundProfileRecord;
    campsites: CampsiteViewWithDomain[];
    sessionInfo: GetSession;
    openUserSettings: () => void;
}
export interface AccountContextUnauthenticated {
    authenticated: false;
}
