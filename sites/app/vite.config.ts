import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'path';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
	plugins: [
		sveltekit(),
		viteStaticCopy({
			targets: [
				{
					src: path.resolve(__dirname, '../../lang/*'),
					dest: 'lang'
				},
				{
					src: [
						path.resolve(__dirname, './node_modules/@fontsource/*/files/*'),
						path.resolve(__dirname, './node_modules/@fontsource-variable/*/files/*'),
						path.resolve(__dirname, '../../node_modules/@fontsource/*/files/*'),
						path.resolve(__dirname, '../../node_modules/@fontsource-variable/*/files/*'),
					],
					dest: 'files'
				}
			]
		})
	]
});
