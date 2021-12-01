import useSWR from 'swr';
import { useState, useEffect, useContext } from 'react';
import { ZendeskTicket } from '../types/ZendeskTicket';
import { fetcher, FetcherError } from '../util/fetcher';
import { SiteContext } from '../contexts/SiteContext';

export type APIResponse = {
	tickets?: ZendeskTicket[];
	totalCount?: number;
	error?: string;
};

const useZendeskAPI: (
	page: number,
	limit: number
) => [APIResponse | undefined, string] = (page: number, limit: number) => {
	const site = useContext(SiteContext);
	const baseUrl = process.env.REACT_APP_USE_LOCAL_API
		? 'localhost:3005'
		: 'http://ec2-35-183-81-115.ca-central-1.compute.amazonaws.com:8080';
	const apiUrl = `${baseUrl}/tickets?site=${site}&limit=${limit}&page=${page}`;
	const auth = {
		username: process.env.REACT_APP_USERNAME || '',
		apiKey: process.env.REACT_APP_API_KEY || '',
	};

	const fetcherWithAuth = (apiUrl: string) => fetcher(apiUrl, auth);

	const [apiError, setApiError] = useState<string>('');
	const { data, error } = useSWR<APIResponse, FetcherError>(
		apiUrl,
		fetcherWithAuth
	);

	useEffect(() => {
		if (error) {
			setApiError(
				`${error.status}: ${error.message}. ${error.info?.error}`
			);
		} else {
			setApiError('');
		}
	}, [error]);

	useEffect(() => {
		if (data) {
			if (data.error) {
				setApiError(data.error);
			} else {
				setApiError('');
			}
		}
	}, [data]);

	return [data, apiError];
};

export default useZendeskAPI;
