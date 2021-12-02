import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Column } from 'react-table';

import PagedTable from './PagedTable';

export default {
	title: 'Components/PagedTable',
	component: PagedTable,
	argTypes: {
		onPageChange: { action: 'page changed' },
		onRowClick: { action: 'row clicked' },
	},
} as ComponentMeta<typeof PagedTable>;

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

const Template: ComponentStory<typeof PagedTable> = (args) => (
	<PagedTable {...args} />
);

export const OnePageTable = Template.bind({});
OnePageTable.args = {
	tableData: { data: mockData, columns: mockColumns },
	totalRows: 10,
	rowsPerPage: 10,
};

export const TwoPageTable = Template.bind({});
TwoPageTable.args = {
	tableData: { data: mockData, columns: mockColumns },
	totalRows: 10,
	rowsPerPage: 5,
};

export const FivePageTable = Template.bind({});
FivePageTable.args = {
	tableData: { data: mockData, columns: mockColumns },
	totalRows: 10,
	rowsPerPage: 2,
};

export const FivePageTableLarge = Template.bind({});
FivePageTableLarge.args = {
	tableData: { data: mockData, columns: mockColumns },
	totalRows: 10,
	rowsPerPage: 2,
	pagingSize: 'large',
};

export const TenPageTable = Template.bind({});
TenPageTable.args = {
	tableData: { data: mockData, columns: mockColumns },
	totalRows: 10,
	rowsPerPage: 1,
};

export const TenPageTableLarge = Template.bind({});
TenPageTableLarge.args = {
	tableData: { data: mockData, columns: mockColumns },
	totalRows: 10,
	rowsPerPage: 1,
	pagingSize: 'large',
};
