import createConfig from '@campground/svelte-config';
import packageJson from './package.json' with { type: 'json' };

const packageName = packageJson.name.split('/').slice(-1)[0];

/** @type {import('@sveltejs/kit').Config} */
const config = createConfig(packageName, 'node');

export default config;
