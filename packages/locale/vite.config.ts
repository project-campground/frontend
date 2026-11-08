import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'path';
import { viteStaticCopy } from 'vite-plugin-static-copy';

import createConfig from '@campground/svelte-config';
import packageJson from './package.json' with { type: 'json' };
const packageName = packageJson.name.split('/').slice(-1)[0]!;

export default defineConfig({
	plugins: [
		sveltekit(createConfig(packageName, 'lib')),
		viteStaticCopy({ targets: [{ src: path.resolve(__dirname, '../../lang/*'), dest: 'lang' }] }),
	],
});
