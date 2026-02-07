import type { TentViewDetailed } from "types/tent";
import { createContext } from "react";
import type { CampsiteViewDetailed } from "types/campsites";
import { ContextBase } from "~/context/session/base";
import type { ContextSuite } from "~/context/context-suite";

export class CurrentTentContext extends ContextBase<TentViewDetailed> {
}

export const TentContext = createContext<CurrentTentContext>(null!);

export const CampsiteContext = createContext<CampsiteViewDetailed>(null!);
export type CampsiteContextSuite = ContextSuite & { campsite: CampsiteViewDetailed };
export const CampsiteContextSuiteContext = createContext<CampsiteContextSuite>(null!);