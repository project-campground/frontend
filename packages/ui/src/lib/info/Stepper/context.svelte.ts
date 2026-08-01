import { createContext } from 'svelte';
import type { Readable } from 'svelte/store';

export const [getStepperIndex, setStepperIndex] = createContext<Readable<number>>();
