import adapterNode from '@sveltejs/adapter-node';
import adapterStatic from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import type { Config } from '@sveltejs/kit';
import path from 'node:path';

const mostTopDir = path.join(import.meta.dirname, '../../..');

const createConfig = (packageName: string, type: 'static' | 'lib' | 'node' = 'node'): Config => ({
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
	adapter:
		type === 'lib' ? undefined
		: type === 'static' ? adapterStatic()
		: adapterNode({ precompress: false }),
});

export default createConfig;
