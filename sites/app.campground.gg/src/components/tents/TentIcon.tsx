import { IconHash, IconLayoutDashboardFilled, type Icon, type IconProps } from "@tabler/icons-react";
import type { ForwardRefExoticComponent } from "react";
import type { TentType } from "types/tent";

type Props = {
    type: TentType | "bulletin";
    viewType: number;
}

export const TentTypeToIcon: Record<TentType | "bulletin", ForwardRefExoticComponent<IconProps & React.RefAttributes<Icon>>> = {
    "bulletin": IconLayoutDashboardFilled,
    "text": IconHash,
};

export default function TentIcon({ type }: Props) {
    const IconComponent = TentTypeToIcon[type];
    return (
        <IconComponent />
    );
}