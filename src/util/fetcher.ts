export class FetcherError extends Error {
	info?: { error: string };
	status?: number;
}

export const fetcher = (
	url: RequestInfo,
	auth?: { username: string; apiKey: string }
) => {
	let init: RequestInit | undefined = undefined;
	if (auth?.username && auth.apiKey) {
		init = {
			headers: {
				Authorization:
					'Basic ' + btoa(`${auth.username}:${auth.apiKey}`),
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		};
	}

	return fetch(url, init)
		.then(async (res) => {
			// If the status code is not in the range 200-299,
			// we still try to parse and throw it.
			if (!res.ok) {
				const error = new FetcherError(
					'An error occurred while fetching the data'
				);
				// Attach extra info to the error object.
				error.info = await res.json();
				error.status = res.status;
				throw error;
			}

			return res.json();
		})
		.catch((err) => {
			throw err;
		});
};
