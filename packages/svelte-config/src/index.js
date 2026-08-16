import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import path from 'node:path';

const mostTopDir = path.join(import.meta.dirname, '../../..');

/** @type {(packageName: string) => import('@sveltejs/kit').Config} */
const createConfig = (packageName) => ({
	preprocess: vitePreprocess({ style: true, script: false }),
	compilerOptions: {
		experimental: { async: true },
		// Makes theming a bit more predictable
		cssHash: ({ name, filename }) => {
			const componentPackage =
				filename.startsWith('src') ? packageName : filename.slice(mostTopDir.length + 1).split('/')[1];

			const dirName = filename.split('/').slice(-2)[0]?.split('=')[0];

			const componentDirName = dirName?.slice(
				dirName?.startsWith('(') || dirName?.startsWith('[') ? 1 : 0,
				dirName?.endsWith(']') || dirName?.endsWith(')') ? -1 : undefined,
			);
			return `${componentPackage}-${componentDirName}-${name.startsWith('+') ? name.slice(1) : name}`;
		},
		// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
		runes: ({ filename }) => (filename.split(/[/\\]/).includes('node_modules') ? undefined : true),
	},
	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter(),
	},
});

export default createConfig;
