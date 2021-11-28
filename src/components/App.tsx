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

const fetcher = (input: RequestInfo) => fetch(input).then((res) => res.json());
type APIResponse = {
	tickets?: ZendeskTicket[];
	error?: string;
};

function App() {
	const apiUrl =
		'http://ec2-35-183-81-115.ca-central-1.compute.amazonaws.com:8080/tickets?limit=25';

	const { data, error } = useSWR<APIResponse>(apiUrl, fetcher);
	const [displayData, setDisplayData] = useState<APIResponse['tickets']>();
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
		}
	}, [data]);

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
			{error && <div>Error: {error}</div>}
		</div>
	);
}

export default App;
