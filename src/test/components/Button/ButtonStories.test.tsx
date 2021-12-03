import {
	Default,
	Square,
	Small,
	Medium,
	Large,
	Primary,
	Secondary,
	Disabled,
} from '../../../components/Button/Button.stories';
import renderer from 'react-test-renderer';

describe('Button Story regression tests', () => {
	it('should render a default button', () => {
		const button = renderer.create(<Default {...Default.args} />);
		expect(button).toMatchSnapshot();
	});
	it('should render a square button', () => {
		const button = renderer.create(<Square {...Square.args} />);
		expect(button).toMatchSnapshot();
	});
	it('should render a small button', () => {
		const button = renderer.create(<Small {...Small.args} />);
		expect(button).toMatchSnapshot();
	});
	it('should render a medium button', () => {
		const button = renderer.create(<Medium {...Medium.args} />);
		expect(button).toMatchSnapshot();
	});
	it('should render a large button', () => {
		const button = renderer.create(<Large {...Large.args} />);
		expect(button).toMatchSnapshot();
	});
	it('should render a primary button', () => {
		const button = renderer.create(<Primary {...Primary.args} />);
		expect(button).toMatchSnapshot();
	});
	it('should render a secondary button', () => {
		const button = renderer.create(<Secondary {...Secondary.args} />);
		expect(button).toMatchSnapshot();
	});
	it('should render a disabled button', () => {
		const button = renderer.create(<Disabled {...Disabled.args} />);
		expect(button).toMatchSnapshot();
	});
});
