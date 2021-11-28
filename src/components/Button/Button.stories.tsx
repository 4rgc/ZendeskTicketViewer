import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Button } from './Button';

export default {
	title: 'Components/Button',
	component: Button,
	// More on argTypes: https://storybook.js.org/docs/react/api/argtypes
	argTypes: { onClick: { action: 'clicked' } },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = ({ children, ...args }) => (
	<Button {...args}>{children}</Button>
);

export const Default = Template.bind({});

export const Small = Template.bind({});
Small.args = { size: 'small', children: 'Small' };

export const Medium = Template.bind({});
Medium.args = { size: 'medium', children: 'Medium Btn' };

export const Large = Template.bind({});
Large.args = { size: 'large', children: 'Large Button !!!' };

export const Primary = Template.bind({});
Primary.args = { kind: 'primary', children: 'Primary' };

export const Secondary = Template.bind({});
Secondary.args = { kind: 'secondary', children: 'Secondary' };
