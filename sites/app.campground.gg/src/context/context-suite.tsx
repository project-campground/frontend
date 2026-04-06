import { createContext } from "react";
import type { Session } from "./session/types";
import { useSnackbars, type SnackbarContextType } from "./snackbar";
import { useSession } from "./session";

export type ContextSuite = {
    session: Session;
    floaters: SnackbarContextType;
}

export const ContextSuiteContext = createContext<ContextSuite>(null!);

export function ContextSuiteProvider({ children }: React.PropsWithChildren) {
    const session = useSession();
    const floaters = useSnackbars();

    return (
        <ContextSuiteContext.Provider value={{ session, floaters }}>
            {children}
        </ContextSuiteContext.Provider>
    )
}