import adapter from '@sveltejs/adapter-node';
import sveltePreprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: sveltePreprocess({
		typescript: true,
		postcss: true,
		globalStyle: true
	}),

	kit: {
		adapter: adapter({
			out: 'build'
		}),
		alias: {
			$src: './src',
		},
		files: {
			assets: '../public'
		}
	}
};

export default config;
