import type { Snippet } from "svelte";
import type { TabId } from "./context.ts";

export interface ItemProps {
    id: TabId;
    isActive?: boolean;
    children: Snippet;
}
export interface ListProps {
    children: Snippet;
}
export interface TabProps {
    children?: Snippet;
}
export interface RootProps {
    tabIds: TabId[];
    tabs: Snippet<[TabId]>;
    children: Snippet;
}