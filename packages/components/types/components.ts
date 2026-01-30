export interface ButtonPropsVariantOverrides {
    glow: true;
}
export interface AvatarPropsSizeOverrides {
    xl: true;
    xxl: true;
    xxxl: true;
}

// Modify components
declare module "@mui/joy/Button/ButtonProps" {
    interface ButtonPropsVariantOverrides {
        glow: true;
    }
}
declare module "@mui/joy/Avatar/AvatarProps" {
    interface ButtonPropsVariantOverrides {
        xl: true;
        xxl: true;
        xxxl: true;
    }
}