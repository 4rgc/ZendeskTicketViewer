import { Default } from '../../components/Header/Header.stories';
import { render } from 'enzyme';

describe('Header story regression tests', () => {
	it('should render the header', () => {
		const header = render(<Default {...Default.args} />);
		expect(header).toMatchSnapshot();
	});
});
