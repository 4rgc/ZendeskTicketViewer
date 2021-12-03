import { shallow } from 'enzyme';
import { Paging, PagingProps } from '../../../components/Paging/Paging';

describe('Paging tests', () => {
	const defaultArgs: PagingProps = {
		pageCount: 0,
		page: 0,
		size: 'small',
		onPageSelected: () => {},
		onNextSelected: () => {},
		onPrevSelected: () => {},
	};

	beforeAll(() => {});

	it('should render 2 Buttons', () => {
		const paging = shallow(<Paging {...defaultArgs} showPrevNext={true} />);
		expect(paging.find('Button').length).toBe(2);
	});

	it('should render 5 buttons', () => {
		const paging = shallow(<Paging {...defaultArgs} pageCount={5} />);
		expect(paging.find('Button').length).toBe(5);
	});

	it('should render limiting to 5 buttons', () => {
		const paging = shallow(
			<Paging {...defaultArgs} pageCount={5} size="large" />
		);
		expect(paging.find('Button').length).toBe(5);
	});

	it('should render 7 buttons', () => {
		const paging = shallow(
			<Paging {...defaultArgs} pageCount={7} size="large" />
		);
		expect(paging.find('Button').length).toBe(7);
	});

	it('should pass the previous button handler to the button', () => {
		const mockHandler = jest.fn(() => {});
		const paging = shallow(
			<Paging
				{...defaultArgs}
				showPrevNext={true}
				page={1}
				pageCount={3}
				onPrevSelected={mockHandler}
			/>
		);
		paging.find('Button').first().simulate('click');
		expect(mockHandler).toHaveBeenCalled();
	});

	it('should pass the next button handler to the button', () => {
		const mockHandler = jest.fn(() => {});
		const paging = shallow(
			<Paging
				{...defaultArgs}
				showPrevNext={true}
				page={1}
				pageCount={3}
				onNextSelected={mockHandler}
			/>
		);
		paging.find('Button').last().simulate('click');
		expect(mockHandler).toHaveBeenCalled();
	});

	it('should pass the page selected button handler to the button', () => {
		const mockHandler = jest.fn(() => {});
		const paging = shallow(
			<Paging
				{...defaultArgs}
				showPrevNext={true}
				page={1}
				pageCount={3}
				onPageSelected={mockHandler}
			/>
		);
		paging.find('Button').at(1).simulate('click');
		expect(mockHandler).toHaveBeenCalled();
	});
});
