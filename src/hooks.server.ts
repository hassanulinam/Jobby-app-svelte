import { redirect } from '@sveltejs/kit';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	// Define protected routes
	const protectedRoutes = ['/jobs', '/profile', '/dashboard', '/settings']; // Add your protected routes here

	const isProtectedRoute = protectedRoutes.some((route) => event.url.pathname.startsWith(route));

	if (isProtectedRoute) {
		const token = event.cookies.get('jwt_token');
		if (!token) {
			throw redirect(302, '/login');
		}
	}

	const response = await resolve(event);
	return response;
};
