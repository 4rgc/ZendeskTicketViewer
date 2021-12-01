import { MouseEvent, useEffect, useState } from 'react';
import { Column } from 'react-table';
import { ZendeskTicket } from '../types/ZendeskTicket';
import './App.css';
import Header from './Header/Header';
import Table from './Table/Table';
import { TicketDetails } from './TicketDetails/TicketDetails';
import _ from 'lodash';
import moment from 'moment';
import { ErrorView } from './ErrorView/ErrorView';
import { Paging } from './Paging/Paging';
import useZendeskAPI, { APIResponse } from '../hooks/useZendeskAPI';
import usePagination from '../hooks/usePagination';

function App() {
	const ticketsPerPage = 25;
	const [{ page, pageCount }, setPage, setPageCount] = usePagination(0, 0);
	const [data, error] = useZendeskAPI(page, ticketsPerPage);
	const [displayData, setDisplayData] = useState<APIResponse['tickets']>();
	const [selectedTicket, setSelectedTicket] = useState<ZendeskTicket | null>(
		null
	);

	useEffect(() => {
		if (data) {
			const tickets = data.tickets;
			if (tickets) {
				const formatted = formatForDisplay(tickets);
				setDisplayData(formatted);
				if (data.totalCount)
					setPageCount(Math.ceil(data.totalCount / ticketsPerPage));
			}
		}
	}, [data, setPageCount]);

	const formatForDisplay = (tickets: ZendeskTicket[]) => {
		const clonedTickets = _.cloneDeep(tickets);
		clonedTickets.forEach((ticket) => {
			ticket.created_at = moment(ticket.created_at).calendar();
			ticket.updated_at = moment(ticket.updated_at).calendar();
		});
		return clonedTickets;
	};

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
			{error !== '' ? <ErrorView type="error" message={error} /> : null}
			<div className="table-container">
				<Table
					data={displayData ? displayData : []}
					columns={tableHeaders}
					onRowClick={onRowClick}
				/>
			</div>
			{pageCount > 1 ? (
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
