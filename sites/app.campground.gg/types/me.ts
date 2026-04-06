import type { CampsiteViewBasic } from "./campsites";
import type { ProfileViewBasic } from "./user";

export interface Me {
    profile: ProfileViewBasic;
    campsites: CampsiteViewBasic[];
}