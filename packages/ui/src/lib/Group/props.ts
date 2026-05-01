import type { Snippet } from "svelte";
import type { ClassValue } from "svelte/elements";

export default interface GroupProps {
    children?: Snippet;
    class?: ClassValue;
    wrap?: boolean;
    withMobile?: boolean;
    mobileReversed?: boolean;
    gap?: number;
}