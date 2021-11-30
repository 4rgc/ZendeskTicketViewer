import { shallow } from 'enzyme';
import { Button } from '../../components/Button/Button';

describe('Button behavioral tests', () => {
	it('should call the onClick method passed in', () => {
		const mockHandler = jest.fn();
		const button = shallow(<Button onClick={mockHandler} />);
		button.find('button').simulate('click');
		expect(mockHandler).toBeCalledTimes(1);
	});
	it('should not call the onClick method passed in', () => {
		const mockHandler = jest.fn();
		const button = shallow(<Button disabled onClick={mockHandler} />);
		button.find('button').simulate('click');
		expect(mockHandler).not.toBeCalled();
	});
});
