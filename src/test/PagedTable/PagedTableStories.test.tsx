import {
	OnePageTable,
	TwoPageTable,
	FivePageTable,
	FivePageTableLarge,
	TenPageTable,
	TenPageTableLarge,
} from '../../components/PagedTable/PagedTable.stories';
import { render } from 'enzyme';
import { PagedTableProps } from '../../components/PagedTable/PagedTable';

describe('PagedTable story tests', () => {
	it('should render the one page table story', () => {
		const args = OnePageTable.args as PagedTableProps<object>;
		const table = render(<OnePageTable {...args} />);
		expect(table).toMatchSnapshot();
	});

	it('should render the two page table story', () => {
		const args = TwoPageTable.args as PagedTableProps<object>;
		const table = render(<TwoPageTable {...args} />);
		expect(table).toMatchSnapshot();
	});

	it('should render the five page table story', () => {
		const args = FivePageTable.args as PagedTableProps<object>;
		const table = render(<FivePageTable {...args} />);
		expect(table).toMatchSnapshot();
	});

	it('should render the five page table with large paging story', () => {
		const args = FivePageTableLarge.args as PagedTableProps<object>;
		const table = render(<FivePageTableLarge {...args} />);
		expect(table).toMatchSnapshot();
	});

	it('should render the ten page table story', () => {
		const args = TenPageTable.args as PagedTableProps<object>;
		const table = render(<TenPageTable {...args} />);
		expect(table).toMatchSnapshot();
	});

	it('should render the ten page table with large paging story', () => {
		const args = TenPageTableLarge.args as PagedTableProps<object>;
		const table = render(<TenPageTableLarge {...args} />);
		expect(table).toMatchSnapshot();
	});
});
