import { sveltekit } from '@sveltejs/kit/vite';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { defineConfig } from 'vite';
import path from 'path';
import { viteStaticCopy } from 'vite-plugin-static-copy';

import createConfig from '@campground/svelte-config';
import packageJson from './package.json' with { type: 'json' };
const packageName = packageJson.name.split('/').slice(-1)[0]!;

export default defineConfig({
	plugins: [
		enhancedImages(),
		sveltekit(createConfig(packageName, 'lib')),
		viteStaticCopy({
			targets: [
				{
					src: [
						path.resolve(__dirname, './node_modules/@fontsource/*/files/*'),
						path.resolve(__dirname, '../../node_modules/@fontsource/*/files/*'),
					],
					dest: 'files',
				},
			],
		}),
	],
});
