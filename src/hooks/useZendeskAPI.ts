import useSWR from 'swr';
import { useState, useEffect } from 'react';
import { ZendeskTicket } from '../types/ZendeskTicket';
import { fetcher, FetcherError } from '../util/fetcher';

export type APIResponse = {
	tickets?: ZendeskTicket[];
	totalCount?: number;
	error?: string;
};

const useZendeskAPI = ({ page, limit }: { page: number; limit: number }) => {
	const apiUrl = `http://ec2-35-183-81-115.ca-central-1.compute.amazonaws.com:8080/tickets?limit=${limit}&page=${page}`;

	const [apiError, setApiError] = useState<string>('');
	const { data, error } = useSWR<APIResponse, FetcherError>(
		`${apiUrl}${page}`,
		fetcher
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
