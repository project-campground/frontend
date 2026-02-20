export type PseudoTentType = "bulletin" | "members";
export const pseudoTents: Record<PseudoTentType, { name: string }> = {
    members: { name: "Members" },
    bulletin: { name: "Bulletin Board" },
};