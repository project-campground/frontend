
import { } from "@mui/joy";

// Add new text levels
export interface TypographySystemOverrides {
    code: true;
}

declare module "@mui/joy/styles/types/typography" {
    // Add new text levels
    interface TypographySystemOverrides {
        code: true;
        ["code-keyword"]: true;
        ["code-string"]: true;
        ["code-number"]: true;
        ["code-template"]: true;
        ["code-function"]: true;
        ["code-class"]: true;
        ["code-attribute"]: true;
    }
}