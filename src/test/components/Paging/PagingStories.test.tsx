import {
	OnePage,
	TwoPage,
	ThreePage,
	FivePage,
	SevenPage,
	TenPage,
	SevenPageWithPrevNext,
	SevenPageOnLast,
} from '../../../components/Paging/Paging.stories';
import { render } from 'enzyme';
import { PagingProps } from '../../../components/Paging/Paging';

describe('Paging story tests', () => {
	it('should render one page Paging', () => {
		const args = OnePage.args as PagingProps;
		const paging = render(<OnePage {...args} />);
		expect(paging).toMatchSnapshot();
	});
	it('should render two page Paging', () => {
		const args = TwoPage.args as PagingProps;
		const paging = render(<TwoPage {...args} />);
		expect(paging).toMatchSnapshot();
	});
	it('should render five page Paging', () => {
		const args = FivePage.args as PagingProps;
		const paging = render(<FivePage {...args} />);
		expect(paging).toMatchSnapshot();
	});
	it('should render seven page Paging', () => {
		const args = SevenPage.args as PagingProps;
		const paging = render(<SevenPage {...args} />);
		expect(paging).toMatchSnapshot();
	});
	it('should render ten page Paging', () => {
		const args = TenPage.args as PagingProps;
		const paging = render(<TenPage {...args} />);
		expect(paging).toMatchSnapshot();
	});
	it('should render seven page Paging with prev/next', () => {
		const args = SevenPageWithPrevNext.args as PagingProps;
		const paging = render(<SevenPageWithPrevNext {...args} />);
		expect(paging).toMatchSnapshot();
	});
	it('should render seven page Paging on last page', () => {
		const args = SevenPageOnLast.args as PagingProps;
		const paging = render(<SevenPageWithPrevNext {...args} />);
		expect(paging).toMatchSnapshot();
	});
});
