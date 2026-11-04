import adapter from '@sveltejs/adapter-vercel';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess(),
	kit: {
		adapter: adapter({
			runtime: 'nodejs22.x'
		}),
		typescript: {
			config: (config) => {
				const {
					importsNotUsedAsValues,
					preserveValueImports,
					ignoreDeprecations,
					...compilerOptions
				} = config.compilerOptions;

				return {
					...config,
					compilerOptions: {
						...compilerOptions,
						verbatimModuleSyntax: true,
						moduleResolution: 'bundler'
					}
				};
			}
		}
	}
};

export default config;
