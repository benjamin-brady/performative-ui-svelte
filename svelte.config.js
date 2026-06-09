import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
preprocess: vitePreprocess(),
compilerOptions: {
runes: ({ filename }) => (filename.split(/[/\\]/).includes('node_modules') ? undefined : true)
},
kit: {
adapter: adapter({ fallback: '200.html' }),
paths: { base: process.env.BASE_PATH ?? '' },
prerender: { handleHttpError: 'warn' }
}
};

export default config;
