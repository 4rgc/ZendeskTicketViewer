import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ErrorView } from './ErrorView';

export default {
	title: 'Components/ErrorView',
	component: ErrorView,
} as ComponentMeta<typeof ErrorView>;

const Template: ComponentStory<typeof ErrorView> = (args) => (
	<ErrorView {...args} />
);

export const ErrorType = Template.bind({});
ErrorType.args = {
	type: 'error',
	message: 'This is an error. Please contact support.',
};

export const WarningType = Template.bind({});
WarningType.args = {
	type: 'warning',
	message: 'This is a warning. Please try again later.',
};
