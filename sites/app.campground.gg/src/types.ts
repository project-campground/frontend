import * as ColorSystem from "components/types/colorSystem";
import * as Typography from "components/types/typography";

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