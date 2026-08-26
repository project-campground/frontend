import adapterNode from '@sveltejs/adapter-node';
import adapterStatic from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import path from 'node:path';

const mostTopDir = path.join(import.meta.dirname, '../../..');

/**
 * @param {string} packageName
 * @param {'static' | 'lib' | 'node'} type
 * @type {(packageName: string) => import('@sveltejs/kit').Config}
 */
const createConfig = (packageName, type = 'node') => ({
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
		css: type === 'lib' ? 'external' : 'injected',
		// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
		runes: ({ filename }) => (filename.split(/[/\\]/).includes('node_modules') ? undefined : true),
	},
	kit: {
		adapter:
			type === 'lib' ? undefined
			: type === 'static' ? adapterStatic()
			: adapterNode({ precompress: false }),
	},
});

export default createConfig;
