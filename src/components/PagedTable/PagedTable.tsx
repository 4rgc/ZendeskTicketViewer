import { useState } from 'react';
import { PropsWithChildren } from 'react';
import { Paging, PagingProps } from '../Paging/Paging';
import Table, { TableProps } from '../Table/Table';
import './PagedTable.css';

export interface PagedTableProps<T extends object> {
	tableData: {
		data?: TableProps<T>['data'];
		columns: TableProps<T>['columns'];
	};
	pagingSize: PagingProps['size'];
	rowsPerPage: number;
	totalRows: number;
	onRowClick: TableProps<T>['onRowClick'];
	onPageChange: (page: number) => void;
}

function PagedTable<T extends object>({
	tableData,
	rowsPerPage,
	pagingSize,
	totalRows,
	onRowClick,
	onPageChange,
}: PropsWithChildren<PagedTableProps<T>>) {
	const { data, columns } = tableData;
	const [page, setPage] = useState(0);
	const pageCount = Math.ceil(totalRows / rowsPerPage);

	const onPageSelected = (page: number) => {
		onPageChange(page);
		setPage(page);
	};
	const onPrevPageClicked = () => {
		onPageChange(page - 1);
		setPage(page - 1);
	};
	const onNextPageClicked = () => {
		onPageChange(page + 1);
		setPage(page + 1);
	};

	return (
		<div className="paged-table-container">
			<div className="table-container">
				<Table
					data={data ? data : []}
					columns={columns}
					onRowClick={onRowClick}
				/>
			</div>
			{pageCount > 1 ? (
				<Paging
					size={pagingSize}
					page={page}
					pageCount={pageCount}
					showPrevNext
					onPageSelected={onPageSelected}
					onPrevSelected={onPrevPageClicked}
					onNextSelected={onNextPageClicked}
				/>
			) : null}
		</div>
	);
}

export default PagedTable;
