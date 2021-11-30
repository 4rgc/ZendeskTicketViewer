import Table from '../../components/Table/Table';
import { shallow } from 'enzyme';

describe('Table tests', () => {
	it('should call the click handler on row clicked', () => {
		const mockHandler = jest.fn();
		const table = shallow(
			<Table
				columns={[
					{ Header: 'a', accessor: 'a' },
					{ Header: 'b', accessor: 'b' },
				]}
				data={[{ a: 'hello', b: 'world' }]}
				onRowClick={mockHandler}
			/>
		);
		table.find('tr').last().simulate('click');
		expect(mockHandler).toHaveBeenCalled();
	});
});
