import { createContext } from "react";
import type PermissionsManager from "./PermissionsManager";

export const PermissionsContext = createContext<PermissionsManager>(null!);