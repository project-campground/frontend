import { defineNodeSpec } from 'prosekit/core';

export function defineText() {
	return defineNodeSpec({ name: 'text', group: 'inline' });
}
