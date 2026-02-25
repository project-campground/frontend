import type { TentViewDetailed } from "types/tent";
import { createContext, useContext } from "react";
import type { CampsiteViewDetailed } from "types/campsites";
import { ContextBase } from "~/context/session/base";
import type { ContextSuite } from "~/context/context-suite";
import type PermissionsManager from "~/context/permissions/PermissionsManager";

export class CurrentTentContext extends ContextBase<TentViewDetailed> {
}

export const TentContext = createContext<CurrentTentContext>(null!);

export const useCampsite = () => useContext(CampsiteContextSuiteContext).campsite;
export const useCampsiteContext = () => useContext(CampsiteContextSuiteContext);
export type CampsiteContextSuite = ContextSuite & { permissions: PermissionsManager, campsite: CampsiteViewDetailed, updateCampsite: (update: Partial<CampsiteViewDetailed>) => unknown; };
export const CampsiteContextSuiteContext = createContext<CampsiteContextSuite>(null!);