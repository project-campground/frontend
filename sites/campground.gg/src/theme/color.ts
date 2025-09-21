// From Yoki's code
// Copied by PrettyGoodName, but it was also written by PrettyGoodName
// Not exactly a proprietary code
// Could rewrite in-case it's not in Campground's interest

const getRedChannel = (value: number) => value >> 16;
const getGreenChannel = (value: number) => (value >> 8) % 0x100;
const getBlueChannel = (value: number) => value % 0x100;
const decimalifyColour = (r: number, g: number, b: number) => (Math.floor(r) << 16) | (Math.floor(g) << 8) | Math.floor(b);

/**
 * Mixes two decimal colours by the given opacity.
 * @param c1 First colour to mix in
 * @param c2 Second colour to mix in
 * @param p2 The floating number that represents percentage of second colour to put in the mix. `1` is `100%`
 */
export function mixColors(c1: number, c2: number, p2: number) {
    const p1 = 1 - p2;

    return decimalifyColour(
        getRedChannel(c1) * p1 + getRedChannel(c2) * p2,
        getGreenChannel(c1) * p1 + getGreenChannel(c2) * p2,
        getBlueChannel(c1) * p1 + getBlueChannel(c2) * p2
    );
}

/**
 * Moves colour more towards grey based on the given %. This is similar to `mixColors`.
 * @param c Colour to introduce greyness to
 * @param p2 The floating number that represents percentage of grey to put in the mix. `1` is `100%`
 */
export function grayscaleColor(c: number, p2: number) {
    const p1 = 1 - p2;

    const red = getRedChannel(c);
    const green = getGreenChannel(c);
    const blue = getBlueChannel(c);

    // Multiply by %, since blue is naturally darker to our eyes and green is the brightest
    const brightness = red * 0.4 + green * 0.6 + blue * 0.2;
    const greyness = brightness * p2;

    return decimalifyColour(red * p1 + greyness, green * p1 + greyness, blue * p1 + greyness);
}

export const mixHexColors = (c1: string, c2: string, p1: number) => getHexString(mixColors(getDecimalValue(c1), getDecimalValue(c2), p1));

export const greyscaleHexColor = (c: string, p2: number) => getHexString(grayscaleColor(getDecimalValue(c), p2));

export const getDecimalValue = (colour: string) => parseInt(colour.slice(1), 16);
export const getHexString = (colour: number) => `#${colour.toString(16).padStart(6, "0")}`;
