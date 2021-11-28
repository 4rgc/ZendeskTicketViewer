import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Column } from 'react-table';

import Table from './Table';

export default {
	title: 'Components/Table',
	component: Table,
	argTypes: { onRowClick: { action: 'row clicked' } },
} as ComponentMeta<typeof Table>;

type MockDataType = { hello: number; world: number };

const mockColumns: Column<MockDataType>[] = [
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

export const Empty: ComponentStory<typeof Table> = ({
	data,
	columns,
	...args
}) => <Table data={[]} columns={[]} {...args} />;

export const HeaderOnly: ComponentStory<typeof Table> = ({
	data,
	columns,
	...args
}) => <Table columns={mockColumns} data={[]} {...args} />;

export const OneRow: ComponentStory<typeof Table> = ({
	data,
	columns,
	...args
}) => <Table columns={mockColumns} data={mockData.slice(0, 1)} {...args} />;

export const TenRows: ComponentStory<typeof Table> = ({
	data,
	columns,
	...args
}) => <Table columns={mockColumns} data={mockData} {...args} />;

export const FiveRowsWithClickHandler: ComponentStory<typeof Table> = ({
	data,
	columns,
	...args
}) => (
	<Table
		{...args}
		columns={mockColumns}
		data={mockData.slice(0, 5)}
		onRowClick={(e, data) => {
			console.log(data);
		}}
	/>
);
