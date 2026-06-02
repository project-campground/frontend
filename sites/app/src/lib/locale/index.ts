import { LocaleFetcher } from "@campground/locale";
import { readable } from "svelte/store";

export const localeManagerStore = readable(new LocaleFetcher());