import type { Snippet } from "svelte";
import type { ClassValue } from "svelte/elements";

export default interface FlexCenterProps {
    children: Snippet;
    class?: ClassValue;
}