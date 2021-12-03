import {
	Empty,
	Normal,
} from '../../../components/TicketDetails/TicketDetails.stories';
import { render } from 'enzyme';
import { TicketDetailsProps } from '../../../components/TicketDetails/TicketDetails';

describe('TicketDetails story tests', () => {
	it('should render an Empty TicketDetails story', () => {
		const args = Empty.args as TicketDetailsProps;
		const details = render(<Empty {...args} />);
		expect(details).toMatchSnapshot();
	});

	it('should render a Normal TicketDetails story', () => {
		const args = Normal.args as TicketDetailsProps;
		const details = render(<Normal {...args} />);
		expect(details).toMatchSnapshot();
	});
});
