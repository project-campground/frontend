import * as ColorSystem from "components/types/colorSystem";
import * as Typography from "components/types/typography";
import * as Components from "components/types/components";
import * as Shadows from "components/types/shadow";

// Add new shadows
declare module "@mui/joy/styles/types/shadow" {
    interface ShadowOverrides extends Shadows.ShadowOverrides {}
}
// Add new colours
declare module "@mui/joy/styles/types/colorSystem" {
    interface Palette extends ColorSystem.Palette {}
    interface ColorPalettePropOverrides extends ColorSystem.ColorPalettePropOverrides {}
    interface PaletteTextOverrides extends ColorSystem.PaletteTextOverrides {}
    interface PaletteRangeOverrides extends ColorSystem.PaletteRangeOverrides {}
    // interface PaletteOptions extends Styles.PaletteOptions {}
    interface PaletteBackgroundOverrides extends ColorSystem.PaletteBackgroundOverrides {}
}
// Add new colours
declare module "@mui/joy/styles/types/typography" {
    interface TypographySystemOverrides extends Typography.TypographySystemOverrides {}
}
// Modify components
declare module "@mui/joy/Button/ButtonProps" {
    interface ButtonPropsVariantOverrides extends Components.ButtonPropsVariantOverrides {}
}
declare module "@mui/joy/Avatar/AvatarProps" {
    interface AvatarPropsSizeOverrides extends Components.AvatarPropsSizeOverrides {}
}