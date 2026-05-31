import type { TentViewBasic } from "types/campground/tent";

export const PseudoTentType = ["bulletin", "members"] as const;
export type PseudoTentType = typeof PseudoTentType[number];
export const pseudoTents: Record<PseudoTentType, Pick<TentViewBasic, "name" | "viewType"> & { type: TentViewBasic["type"] | PseudoTentType }> = {
    members: { name: "Members", type: "members", viewType: 0 },
    bulletin: { name: "Bulletin Board", type: "bulletin", viewType: 0 },
};