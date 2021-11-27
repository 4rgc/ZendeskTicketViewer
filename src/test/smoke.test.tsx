import App from '../components/App';
import renderer from 'react-test-renderer';

describe('App smoke test', () => {
	it('opens up', () => {
		const component = renderer.create(<App />);

		let tree = component.toJSON();

		expect(tree).toMatchSnapshot();
	});
});
