import { defineNodeSpec } from 'prosekit/core';

export function defineRoot() {
	return defineNodeSpec({ name: 'root', content: 'block+', topNode: true });
}
