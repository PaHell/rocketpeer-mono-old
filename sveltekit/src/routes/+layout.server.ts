import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (({ url }) => {
	if (url.pathname === '/' || url.pathname === '/auth') throw redirect(307, '/auth/login');
}) satisfies LayoutServerLoad;
