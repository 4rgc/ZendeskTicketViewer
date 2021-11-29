import { MouseEvent, useEffect, useState } from 'react';
import { Column } from 'react-table';
import useSWR from 'swr';
import { ZendeskTicket } from '../types/ZendeskTicket';
import './App.css';
import Header from './Header/Header';
import Table from './Table/Table';
import { TicketDetails } from './TicketDetails/TicketDetails';
import _ from 'lodash';
import moment from 'moment';
import { ErrorView } from './ErrorView/ErrorView';

class FetcherError extends Error {
	info?: { error: string };
	status?: number;
}

const fetcher = (url: RequestInfo) => {
	return fetch(url)
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

// const fetcher = (url: RequestInfo) => fetch(url).then((res) => res.json());

type APIResponse = {
	tickets?: ZendeskTicket[];
	error?: string;
};

function App() {
	const apiUrl =
		'http://ec2-35-183-81-115.ca-central-1.compute.amazonaws.com:8080/tickets?limit=10';

	const { data, error } = useSWR<APIResponse, FetcherError>(apiUrl, fetcher);
	const [displayData, setDisplayData] = useState<APIResponse['tickets']>();
	const [apiError, setApiError] = useState<string>('');
	const [selectedTicket, setSelectedTicket] = useState<ZendeskTicket | null>(
		null
	);

	useEffect(() => {
		if (data) {
			const tickets = data.tickets;
			if (tickets) {
				const clonedTickets = _.cloneDeep(tickets);
				clonedTickets.forEach((ticket) => {
					ticket.created_at = moment(ticket.created_at).calendar();
					ticket.updated_at = moment(ticket.updated_at).calendar();
				});
				setDisplayData(clonedTickets);
			}
			if (data.error) {
				setApiError(data.error);
			}
		}
	}, [data]);

	useEffect(() => {
		if (error) {
			setApiError(
				`${error.status}: ${error.message}. ${error.info?.error}`
			);
		}
	}, [error]);

	const tableHeaders: Column<Partial<ZendeskTicket>>[] = [
		{
			Header: 'Subject',
			accessor: 'subject',
		},
		{
			Header: 'Status',
			accessor: 'status',
		},
		{
			Header: 'Created At',
			accessor: 'created_at',
		},
		{
			Header: 'Updated At',
			accessor: 'updated_at',
		},
	];

	const onRowClick = (
		event: MouseEvent<HTMLTableRowElement>,
		ticket: ZendeskTicket
	) => {
		setSelectedTicket(ticket);
	};

	const onTicketDetailsClose = () => {
		setSelectedTicket(null);
	};

	return (
		<div className="App">
			<Header />
			{apiError !== '' ? (
				<ErrorView type="error" message={apiError} />
			) : null}
			<div className="table-container">
				<Table
					data={displayData ? displayData : []}
					columns={tableHeaders}
					onRowClick={onRowClick}
				/>
			</div>
			{selectedTicket && (
				<TicketDetails
					ticket={selectedTicket}
					onClose={onTicketDetailsClose}
				/>
			)}
		</div>
	);
}

export default App;
