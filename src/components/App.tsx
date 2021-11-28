import useSWR from 'swr';
import './App.css';
import Header from './Header/Header';
import Table from './Table/Table';

const fetcher = (input: RequestInfo) => fetch(input).then((res) => res.json());

function App() {
	const apiUrl =
		'http://ec2-35-183-81-115.ca-central-1.compute.amazonaws.com:8080/tickets?limit=5';

	const { data, error } = useSWR(apiUrl, fetcher);

	const tableHeaders = [
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

	return (
		<div className="App">
			<Header />
			<div className="table-container">
			<Table
					data={
						data && !data.error && data.tickets ? data.tickets : []
					}
				columns={tableHeaders}
			/>
			</div>
			{error && <div>Error: {error}</div>}
		</div>
	);
}

export default App;
