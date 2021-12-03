import useZendeskAPI from '../../hooks/useZendeskAPI';
import { renderHook } from '@testing-library/react-hooks';
import * as hooks from 'swr';
import * as fetcherModule from '../../util/fetcher';

describe('useZendeskAPI hook tests', () => {
	const originalUseSWR = hooks.default;
	const originalEnv = process.env;

	beforeEach(() => {
		jest.resetModules();
		process.env = { ...originalEnv };
	});

	afterEach(() => {
		process.env = originalEnv;
	});

	it("should return an error if there's an useSWR error", async () => {
		jest.spyOn(hooks, 'default').mockImplementation((url, fetcher) => ({
			error: { status: 500, message: 'Unknown server error' },
			mutate: () => new Promise(() => {}),
			isValidating: false,
		}));

		const { result } = renderHook(() => useZendeskAPI(1, 1));
		expect(result.current[0]).toBeUndefined();
		expect(result.current[1]).not.toBe('');
	});

	it("should return an error if there's an error prop in the data", () => {
		jest.spyOn(hooks, 'default').mockImplementation((url, fetcher) => ({
			data: { error: 'Oops' },
			mutate: () => new Promise(() => {}),
			isValidating: false,
		}));

		const { result } = renderHook(() => useZendeskAPI(1, 1));
		expect(result.current[0]).toBeDefined();
		expect(result.current[0]).toHaveProperty('error');
		expect(result.current[1]).not.toBe('');
	});

	it("should return the data if there's no error", () => {
		jest.spyOn(hooks, 'default').mockImplementation((url, fetcher) => ({
			data: { tickets: [{}, {}] },
			mutate: () => new Promise(() => {}),
			isValidating: false,
		}));

		const { result } = renderHook(() => useZendeskAPI(1, 1));
		expect(result.current[0]).toBeDefined();
		expect(result.current[0]).toHaveProperty('tickets');
		expect(result.current[1]).toBe('');
	});

	it('should pass the correct url to useSWR', () => {
		const useSWRmock = jest
			.spyOn(hooks, 'default')
			.mockImplementation((url, fetcher) => ({
				data: { tickets: [{}, {}] },
				mutate: () => new Promise(() => {}),
				isValidating: false,
			}));

		const page = 1,
			limit = 1;
		renderHook(() => useZendeskAPI(page, limit));

		expect(useSWRmock).toBeCalledWith(
			expect.stringContaining('/tickets?'),
			expect.anything()
		);
		expect(useSWRmock).toBeCalledWith(
			expect.stringContaining(`page=${page}`),
			expect.anything()
		);
		expect(useSWRmock).toBeCalledWith(
			expect.stringContaining(`limit=${limit}`),
			expect.anything()
		);
	});

	it('should pass on a fetcher wrapper with an auth param', () => {
		jest.spyOn(hooks, 'default').mockImplementation(originalUseSWR);

		const fetcherMock = jest
			.spyOn(fetcherModule, 'fetcher')
			.mockImplementation((url, auth) => new Promise(() => {}));

		renderHook(() => useZendeskAPI(1, 1));

		expect(fetcherMock).toBeCalledWith(
			expect.anything(),
			expect.any(Object)
		);
	});

	it('should use a localhost address if an environment variable is set', () => {
		process.env.REACT_APP_USE_LOCAL_API = 'true';
		jest.spyOn(hooks, 'default').mockImplementation(originalUseSWR);

		const fetcherMock = jest
			.spyOn(fetcherModule, 'fetcher')
			.mockImplementation((url, auth) => new Promise(() => {}));

		renderHook(() => useZendeskAPI(1, 1));

		expect(fetcherMock).toHaveBeenCalledWith(
			expect.stringContaining('localhost'),
			expect.anything()
		);
	});

	it('should pass empty strings in credentials if environment variables are not set', () => {
		process.env.REACT_APP_USERNAME = undefined;
		process.env.REACT_APP_API_KEY = undefined;
		const useSWR = jest
			.spyOn(hooks, 'default')
			.mockImplementation((url, fetcher) => {
				(fetcher as Function)(url);
				return {
					mutate: () => new Promise(() => {}),
					isValidating: false,
				};
			});

		const fetcherMock = jest
			.spyOn(fetcherModule, 'fetcher')
			.mockImplementation((url, auth) => new Promise(() => {}));

		renderHook(() => useZendeskAPI(1, 1));

		expect(useSWR).toHaveBeenCalled();
		expect(fetcherMock).toHaveBeenCalledWith(
			expect.anything(),
			expect.objectContaining({ username: '', apiKey: '' })
		);
	});
});
