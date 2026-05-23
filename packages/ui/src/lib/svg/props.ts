import type { ClassValue } from "svelte/elements";

export interface SvgUseProps extends SvgUseNonIdProps {
    id: 'logo' | 'wordmark';
}
export interface SvgUseNonIdProps {
    w?: number;
    h?: number;
    size?: number;
    class?: ClassValue;
}