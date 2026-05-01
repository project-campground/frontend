import type { ClassValue } from "svelte/elements";

export default interface ImageProps {
    src: string;
    alt?: string | null;
    mw?: number;
    mh?: number;
    w?: number;
    h?: number;
    noRadius?: boolean;
    class?: ClassValue;
}