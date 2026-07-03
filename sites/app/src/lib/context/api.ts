import { createContext } from 'svelte';
import type HTTPBackendClient from '$lib/api/http/HTTPBackendClient.js';

export const [getBackendApi, setBackendApi] = createContext<HTTPBackendClient>();
