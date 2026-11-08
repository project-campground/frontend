import { writable } from 'svelte/store';

export type Theme = 'dark' | 'light';
export const theme = writable<Theme>('dark');
