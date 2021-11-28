import { MouseEvent, PropsWithChildren } from 'react';
import { Column, useTable } from 'react-table';
import './Table.css';

interface TableProps<T extends object> {
	columns: Column<T>[];
	data: T[];
	onRowClick?: (
		event: MouseEvent<HTMLTableRowElement>,
		original: object
	) => void;
}

function Table<T extends object>({
	columns,
	data,
	onRowClick = () => {},
}: PropsWithChildren<TableProps<T>>) {
	const tableInstance = useTable({ columns, data });

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
		tableInstance;

	return (
		<table {...getTableProps()}>
			<thead>
				{headerGroups.map((headerGroup) => (
					<tr {...headerGroup.getHeaderGroupProps()}>
						{headerGroup.headers.map((column) => (
							<th {...column.getHeaderProps()}>
								{column.render('Header')}
							</th>
						))}
					</tr>
				))}
			</thead>
			<tbody {...getTableBodyProps()}>
				{rows.map((row) => {
					prepareRow(row);
					return (
						<tr
							{...row.getRowProps()}
							onClick={(event) => onRowClick(event, row.original)}
						>
							{row.cells.map((cell) => {
								return (
									<td {...cell.getCellProps()}>
										{cell.render('Cell')}
									</td>
								);
							})}
						</tr>
					);
				})}
			</tbody>
		</table>
	);
}

export default Table;
