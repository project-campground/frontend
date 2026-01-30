import BulletinBoard, { BulletinBoardSidebarComponent } from "./BulletinBoard";
import TextTent from "./TextTent";

export const ComponentByTentType: Record<string, { MemberSidebarInfo?: any, Component: any }> = {
    "text": { Component: TextTent },
    "bulletin": { Component: BulletinBoard, MemberSidebarInfo: BulletinBoardSidebarComponent },
}