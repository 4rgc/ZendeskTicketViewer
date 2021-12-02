import { MouseEvent, useEffect, useState } from 'react';
import { Column } from 'react-table';
import { ZendeskTicket } from '../types/ZendeskTicket';
import './App.css';
import Header from './Header/Header';
import { TicketDetails } from './TicketDetails/TicketDetails';
import _ from 'lodash';
import moment from 'moment';
import { ErrorView } from './ErrorView/ErrorView';
import useZendeskAPI, { APIResponse } from '../hooks/useZendeskAPI';
import PagedTable from './PagedTable/PagedTable';

function App() {
	const ticketsPerPage = 25;
	const [page, setPage] = useState(0);
	const [data, error] = useZendeskAPI(page, ticketsPerPage);
	const [displayData, setDisplayData] = useState<APIResponse['tickets']>();
	const [totalRows, setTotalRows] = useState<number>(0);
	const [selectedTicket, setSelectedTicket] = useState<ZendeskTicket | null>(
		null
	);

	useEffect(() => {
		if (data) {
			const tickets = data.tickets;
			if (tickets) {
				const formatted = formatForDisplay(tickets);
				setDisplayData(formatted);
			}
			if (data?.totalCount) {
				setTotalRows(data.totalCount);
			}
		}
	}, [data]);

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

	return (
		<div className="App">
			<Header />
			{error !== '' ? <ErrorView type="error" message={error} /> : null}
			<PagedTable
				pagingSize="small"
				tableData={{ data: displayData, columns: tableHeaders }}
				rowsPerPage={ticketsPerPage}
				totalRows={totalRows}
				onRowClick={onRowClick}
				onPageChange={setPage}
			/>
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
