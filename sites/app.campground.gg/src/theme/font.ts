const fallback = [
    `"Montserrat"`,
    `"Public Sans"`,
    `var(--labs-fontFamily-fallback, var(--labs--apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"))`,
];

export const bodyFontFamily = [
    `"Nunito Sans"`,
    ...fallback
].join(", ");

export const displayFontFamily = [
    `"Quicksand"`,
    `"Nunito Sans"`,
    ...fallback
].join(", ");