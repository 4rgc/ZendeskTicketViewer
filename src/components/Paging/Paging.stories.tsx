import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Paging } from './Paging';

export default {
	title: 'Components/Paging',
	component: Paging,
	argTypes: {
		onPageSelected: { action: 'page selected' },
		onNextSelected: { action: 'next selected' },
		onPrevSelected: { action: 'prev selected' },
	},
} as ComponentMeta<typeof Paging>;

const Template: ComponentStory<typeof Paging> = (args) => <Paging {...args} />;

export const OnePage = Template.bind({});
OnePage.args = { pageCount: 1, page: 0, showPrevNext: false };

export const TwoPage = Template.bind({});
TwoPage.args = { pageCount: 2, page: 1, showPrevNext: false };

export const ThreePage = Template.bind({});
ThreePage.args = { pageCount: 3, page: 1, showPrevNext: false };

export const FivePage = Template.bind({});
FivePage.args = { pageCount: 5, page: 2, showPrevNext: false };

export const SevenPage = Template.bind({});
SevenPage.args = { pageCount: 7, page: 1, showPrevNext: false };

export const TenPage = Template.bind({});
TenPage.args = { pageCount: 10, page: 5, showPrevNext: false };

export const SevenPageWithPrevNext = Template.bind({});
SevenPageWithPrevNext.args = { pageCount: 7, page: 1, showPrevNext: true };
