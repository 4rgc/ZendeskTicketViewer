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
import { Paging } from './Paging/Paging';
import { fetcher, FetcherError } from '../util/fetcher';

type APIResponse = {
	tickets?: ZendeskTicket[];
	totalCount?: number;
	error?: string;
};

function App() {
	const apiUrl =
		'http://ec2-35-183-81-115.ca-central-1.compute.amazonaws.com:8080/tickets?limit=25&page=';

	const [displayData, setDisplayData] = useState<APIResponse['tickets']>();
	const [apiError, setApiError] = useState<string>('');
	const [page, setPage] = useState<number>(0);
	const [pageCount, setPageCount] = useState<number>(0);
	const [selectedTicket, setSelectedTicket] = useState<ZendeskTicket | null>(
		null
	);
	const { data, error } = useSWR<APIResponse, FetcherError>(
		`${apiUrl}${page}`,
		fetcher
	);
	const perPage = 25;

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
				if (data.totalCount)
					setPageCount(Math.ceil(data.totalCount / perPage));
			}
			if (data.error) {
				setApiError(data.error);
			} else {
				setApiError('');
			}
		}
	}, [data]);

	useEffect(() => {
		if (error) {
			setApiError(
				`${error.status}: ${error.message}. ${error.info?.error}`
			);
		} else {
			setApiError('');
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

	const onPageSelected = (page: number) => setPage(page);
	const onPrevPageClicked = () => setPage(page - 1);
	const onNextPageClicked = () => setPage(page + 1);

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
			{!apiError ? (
				<Paging
					size="small"
					page={page}
					pageCount={pageCount}
					showPrevNext
					onPageSelected={onPageSelected}
					onPrevSelected={onPrevPageClicked}
					onNextSelected={onNextPageClicked}
				/>
			) : null}
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
