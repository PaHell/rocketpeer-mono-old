const defaultOptions: RequestInit = {
	method: 'GET', // *GET, POST, PUT, DELETE, etc.
	mode: 'no-cors', // no-cors, *cors, same-origin
	cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
	credentials: 'include', // include, *same-origin, omit
	headers: {
		'Content-Type': 'application/json'
		// 'Content-Type': 'application/x-www-form-urlencoded',
	},
	redirect: 'follow', // manual, *follow, error
	referrerPolicy: 'no-referrer' // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
};

export function setHeaders(headers: HeadersInit) {
	defaultOptions.headers = {
		...defaultOptions.headers,
		...headers
	};
}

const translations: { [key: string]: string } = {
	'fetch failed': 'messages.errors.fetch'
};

export async function http<T extends object>(
	method: RequestInit['method'],
	url: string,
	body: object | null = null,
	options?: RequestInit
): Promise<T> {
	try {
		const resp = await fetch(import.meta.env.VITE_URL_API + url, {
			...defaultOptions,
			...options,
			method,
			body: body ? JSON.stringify(body) : undefined
		});
		const data = resp.json() as T | App.API.RequestError;
		if (Object.hasOwn(data, 'error')) throw data;
		return data as T;
	} catch (error) {
		if (error instanceof Error) {
			const message: string = translations[error.message] || error.message;
			throw {
				message,
				detail: JSON.stringify(error, null, 4)
			} as App.API.RequestError;
		}
		throw error;
	}
}
