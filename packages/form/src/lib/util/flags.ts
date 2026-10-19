/**
 * Gets the max possible integer value constrained within the amount of bit count given.
 * @param bits The amount of bits in an integer
 * @returns The max integer in specified N bits
 */
export function getMaxInteger(bits: number) {
	return (1 << bits) - 1;
}
/**
 * Gets the positive mask (all bits are 1) for a multi-bit flag at the certain position within flagged bits.
 *
 * Essentially, if:
 * - the flag has 2 bits and it is at position 1, the returned integer 0b1100: `00` is at position 0 and `11` at position 1.
 * - the flag has 2 bits and it is at position 2, the returned integer 0b110000: `00` is at position 0, `00` at position 1 and `11` at position 2.
 * @param bits The amount of bits that the flag has
 * @param at The position of the flag
 * @returns The positive mask for the flag
 */
export function getFlagMask(bits: number, at: number) {
	return getMaxInteger(bits) << (at * bits);
}
