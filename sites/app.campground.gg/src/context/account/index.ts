import { createContext, useContext } from "react";
import type { GetSession } from "types/atproto/session";
import type { Me } from "types/campground/me";

export const useMeContext = () => {
    const account = useAccount();
    console.log("Account", account);

    return account?.authenticated ? account.me : null; 
};
export const useAccount = () => useContext(AccountContext);
export const AccountContext = createContext<AccountContext | null>(null);
export type AccountContext = AccountContextAuthenticated | AccountContextUnauthenticated;
export interface AccountContextAuthenticated {
    authenticated: true;
    me: Me;
    account: GetSession;
    openUserSettings: () => void;
}
export interface AccountContextUnauthenticated {
    authenticated: false;
}
