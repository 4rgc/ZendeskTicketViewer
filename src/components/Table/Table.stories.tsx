import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Column } from 'react-table';

import Table from './Table';

export default {
	title: 'Components/Table',
	component: Table,
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

export const Empty: ComponentStory<typeof Table> = () => (
	<Table data={[]} columns={[]} />
);

export const HeaderOnly: ComponentStory<typeof Table> = () => (
	<Table columns={mockColumns} data={[]} />
);

export const OneRow: ComponentStory<typeof Table> = () => (
	<Table columns={mockColumns} data={mockData.slice(0, 1)} />
);

export const TenRows: ComponentStory<typeof Table> = () => (
	<Table columns={mockColumns} data={mockData} />
);
