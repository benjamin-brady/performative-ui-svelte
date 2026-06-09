import { error } from '@sveltejs/kit';
import { COMPONENTS } from '$lib/docs/catalog';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () => COMPONENTS.map((c) => ({ slug: c.slug }));

export const load: PageLoad = ({ params }) => {
	const meta = COMPONENTS.find((c) => c.slug === params.slug);
	if (!meta) error(404, 'Nothing here. Try the sidebar.');
	return { meta };
};
