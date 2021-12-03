import { render } from 'enzyme';
import { ErrorView } from '../../../components/ErrorView/ErrorView';

describe('ErrorView tests', () => {
	it('should render the message as an error', () => {
		const error = render(
			<ErrorView
				type="error"
				message="This is an error. Please contact support"
			/>
		);
		expect(error).toMatchSnapshot();
	});

	it('should render the message as a warning', () => {
		const warning = render(
			<ErrorView
				type="warning"
				message="This is a warning. Please try again"
			/>
		);
		expect(warning).toMatchSnapshot();
	});
});
