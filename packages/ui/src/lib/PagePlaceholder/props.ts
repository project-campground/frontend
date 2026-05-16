import type { Snippet } from "svelte";
import type { ClassValue } from "svelte/elements";

export default interface PagePlaceholderProps {
    status?: number;
    icon: PagePlaceholderIcon;
    title: Snippet;
    class?: ClassValue;
    children: Snippet;
}
export enum PagePlaceholderIcon {
    Welcome,
    Ok,
    NotOk,
    Appreciation,
    Error,
    NotFound,
    Unrecognized,
    Empty,
    NoMore,
    WIP,
};
export const pagePlaceholderIconValues: Record<PagePlaceholderIcon, string> = {
    [PagePlaceholderIcon.Welcome]: "(￣▽￣)ノ",
    [PagePlaceholderIcon.Error]: "(✖╭╮✖)",
    [PagePlaceholderIcon.NotFound]: "┐(￣ ヘ￣)┌",
    [PagePlaceholderIcon.NoMore]: "(づ ◕‿◕ )づ",
    [PagePlaceholderIcon.Empty]: "d(￣◇￣)b",
    [PagePlaceholderIcon.WIP]: "（◞‸◟）",
    [PagePlaceholderIcon.NotOk]: "(╥﹏╥)",
    [PagePlaceholderIcon.Unrecognized]: "(>⌓<｡)",
    [PagePlaceholderIcon.Appreciation]: "(ɔˆ ³(ˆ⌣ˆc)",
    [PagePlaceholderIcon.Ok]: "(｡^‿^｡)",
};
