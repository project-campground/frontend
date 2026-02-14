import type { TypographySystemOverrides as TextSystemOverrides } from "./typography";
import type { Palette as ColorPalette, ColorPalettePropOverrides as ColorPropOverrides, PaletteTextOverrides as ColorTextOverrides, PaletteRangeOverrides as ColorRangeOverrides, PaletteBackgroundOverrides as ColorBackgroundOverrides } from "./colorSystem";

declare module "@mui/joy/styles/types/typography" {
    interface TypographySystemOverrides extends TextSystemOverrides { }
}

// Add new colours
declare module "@mui/joy/styles/types/colorSystem" {
    interface Palette extends ColorPalette { }
    interface ColorPalettePropOverrides extends ColorPropOverrides { }
    interface PaletteTextOverrides extends ColorTextOverrides { }
    interface PaletteRangeOverrides extends ColorRangeOverrides { }
    interface PaletteBackgroundOverrides extends ColorBackgroundOverrides {}
}