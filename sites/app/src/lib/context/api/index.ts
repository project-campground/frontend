import { createContext, useContext } from 'react';
import type HTTPBackendClient from '~/api/http/HTTPBackendClient';

export const useBackendApi = () => useContext(BackendApiContext);
export const BackendApiContext = createContext<HTTPBackendClient>(null!);
