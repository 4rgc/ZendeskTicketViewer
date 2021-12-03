import { fetcher } from '../../util/fetcher';

describe('fetcher', () => {
	const originalFetch = fetch;

	afterEach(() => {
		jest.resetModules();
	});

	it('should call fetch with the url', () => {
		const fetchMock = jest
			.spyOn(window, 'fetch')
			.mockImplementation(
				(url, init) => new Promise(() => new Response())
			);
		const testUrl = 'testurl';

		fetcher(testUrl, { username: 'test', apiKey: 'test' });

		expect(fetchMock).toHaveBeenCalledWith(testUrl, expect.anything());
	});

	it('should call fetch with an Authorization and a Content-Type header', () => {
		const fetchMock = jest
			.spyOn(window, 'fetch')
			.mockImplementation(
				(url, init) => new Promise(() => new Response())
			);

		fetcher('testurl', { username: 'test', apiKey: 'test' });

		expect(fetchMock).toHaveBeenCalledWith(
			expect.anything(),
			expect.objectContaining({
				headers: expect.objectContaining({
					Authorization: expect.stringContaining('Basic '),
					'Content-Type': 'application/x-www-form-urlencoded',
				}),
			})
		);
	});

	it('should call fetch with no headers', () => {
		const fetchMock = jest
			.spyOn(window, 'fetch')
			.mockImplementation(
				(url, init) => new Promise(() => new Response())
			);

		fetcher('testurl');

		expect(fetchMock).toHaveBeenCalledWith(expect.anything(), undefined);
	});

	it('should throw an error if the response was not ok', async () => {
		jest.spyOn(window, 'fetch').mockImplementation(async (url, init) => {
			const res = { ...new Response() };
			res.ok = false;
			res.json = async () => ({});
			return res;
		});

		await expect(fetcher('test')).rejects.toThrow(
			expect.objectContaining({
				status: expect.any(Number),
				info: expect.any(Object),
			})
		);
	});

	it('should call json on the response and return it', async () => {
		const resJsonMock = jest.fn();
		jest.spyOn(window, 'fetch').mockImplementation(async (url, init) => {
			const res = { ...new Response() };
			res.ok = true;
			res.json = resJsonMock.mockImplementation(async () => ({}));
			return res;
		});

		await expect(fetcher('test')).resolves.toBeInstanceOf(Object);
		expect(resJsonMock).toBeCalledTimes(1);
	});
});
