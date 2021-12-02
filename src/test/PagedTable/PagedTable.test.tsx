import PagedTable, {
	PagedTableProps,
} from '../../components/PagedTable/PagedTable';
import { shallow, ShallowWrapper } from 'enzyme';
import { Column } from 'react-table';
import { Paging, PagingProps } from '../../components/Paging/Paging';

type MockDataType = { hello: number; world: number };

const mockColumns: Column<Partial<MockDataType>>[] = [
	{ Header: 'hello', accessor: 'hello' },
	{ Header: 'world', accessor: 'world' },
];

const mockData: MockDataType[] = [
	{ hello: 1, world: 2 },
	{ hello: 2, world: 3 },
	{ hello: 3, world: 4 },
	{ hello: 4, world: 5 },
	{ hello: 5, world: 6 },
	{ hello: 6, world: 7 },
	{ hello: 7, world: 8 },
	{ hello: 8, world: 9 },
	{ hello: 9, world: 10 },
	{ hello: 10, world: 11 },
];

const defaultArgs: PagedTableProps<MockDataType> = {
	tableData: { data: mockData, columns: mockColumns },
	pagingSize: 'small',
	rowsPerPage: 5,
	totalRows: 10,
	onRowClick: () => {},
	onPageChange: () => {},
};

describe('PagedTable tests', () => {
	it('should notify about page change on next pressed', () => {
		const pageChangedHandler = jest.fn();
		const table = shallow<PagedTableProps<MockDataType>>(
			<PagedTable {...defaultArgs} onPageChange={pageChangedHandler} />
		);

		const paging = table.find('Paging') as ShallowWrapper<typeof Paging>;
		(paging.prop('onNextSelected') as PagingProps['onNextSelected'])();
		expect(pageChangedHandler).toHaveBeenCalledWith(1);
	});

	it('should notify about page change on prev pressed', () => {
		const pageChangedHandler = jest.fn();
		const table = shallow<PagedTableProps<MockDataType>>(
			<PagedTable {...defaultArgs} onPageChange={pageChangedHandler} />
		);

		const paging = table.find('Paging') as ShallowWrapper<typeof Paging>;
		(paging.prop('onPrevSelected') as PagingProps['onPrevSelected'])();
		expect(pageChangedHandler).toHaveBeenCalledWith(-1);
	});

	it('should notify about page change on page number pressed', () => {
		const pageChangedHandler = jest.fn();
		const table = shallow<PagedTableProps<MockDataType>>(
			<PagedTable {...defaultArgs} onPageChange={pageChangedHandler} />
		);

		const paging = table.find('Paging') as ShallowWrapper<typeof Paging>;
		(paging.prop('onPageSelected') as PagingProps['onPageSelected'])(1);
		expect(pageChangedHandler).toHaveBeenCalledWith(1);
	});
});
