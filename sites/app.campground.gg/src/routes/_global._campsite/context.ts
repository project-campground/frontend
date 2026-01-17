import type { TentViewDetailed } from "types/tent";
import { createContext } from "react";
import type { CampsiteViewDetailed } from "types/campsites";
import { ContextBase } from "~/context/session/base";

export class CurrentTentContext extends ContextBase<TentViewDetailed> {
}

export const TentContext = createContext<CurrentTentContext>(null!);

export const CampsiteContext = createContext<CampsiteViewDetailed>(null!);