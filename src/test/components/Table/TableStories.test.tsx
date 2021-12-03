import {
	Empty,
	HeaderOnly,
	OneRow,
	TenRows,
	FiveRowsWithClickHandler,
} from '../../../components/Table/Table.stories';
import { render } from 'enzyme';
import { TableProps } from '../../../components/Table/Table';

describe('Table story tests', () => {
	it('should render an empty table story', () => {
		const args = Empty.args as TableProps<object>;
		const table = render(<Empty {...args} />);
		expect(table).toMatchSnapshot();
	});
	it('should render an only header table story', () => {
		const args = HeaderOnly.args as TableProps<object>;
		const table = render(<HeaderOnly {...args} />);
		expect(table).toMatchSnapshot();
	});
	it('should render a one row table story', () => {
		const args = OneRow.args as TableProps<object>;
		const table = render(<OneRow {...args} />);
		expect(table).toMatchSnapshot();
	});
	it('should render a ten row table story', () => {
		const args = TenRows.args as TableProps<object>;
		const table = render(<TenRows {...args} />);
		expect(table).toMatchSnapshot();
	});
	it('should render a five row table with click handler story', () => {
		const args = FiveRowsWithClickHandler.args as TableProps<object>;
		const table = render(<FiveRowsWithClickHandler {...args} />);
		expect(table).toMatchSnapshot();
	});
});
