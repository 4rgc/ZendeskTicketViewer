import { TicketDetails } from '../../../components/TicketDetails/TicketDetails';
import { shallow } from 'enzyme';
import { ZendeskTicket } from '../../../types/ZendeskTicket';
import React from 'react';

const mockTicket: ZendeskTicket = {
	url: 'https://zccandriib.zendesk.com/api/v2/tickets/5.json',
	id: 5,
	external_id: null,
	via: { channel: 'api', source: { from: {}, to: {}, rel: null } },
	created_at: '2021-11-27T23:26:53Z',
	updated_at: '2021-11-27T23:26:53Z',
	type: null,
	subject: 'velit eiusmod reprehenderit officia cupidatat',
	raw_subject: 'velit eiusmod reprehenderit officia cupidatat',
	description:
		'Aute ex sunt culpa ex ea esse sint cupidatat aliqua ex consequat sit reprehenderit. Velit labore proident quis culpa ad duis adipisicing laboris voluptate velit incididunt minim consequat nulla. Laboris adipisicing reprehenderit minim tempor officia ullamco occaecat ut laborum.\n' +
		'\n' +
		'Aliquip velit adipisicing exercitation irure aliqua qui. Commodo eu laborum cillum nostrud eu. Mollit duis qui non ea deserunt est est et officia ut excepteur Lorem pariatur deserunt.',
	priority: null,
	status: 'open',
	recipient: null,
	requester_id: 422236260431,
	submitter_id: 422236260431,
	assignee_id: 422236260431,
	organization_id: 1900135210147,
	group_id: 4411369223316,
	collaborator_ids: [],
	follower_ids: [],
	email_cc_ids: [],
	forum_topic_id: null,
	problem_id: null,
	has_incidents: false,
	is_public: true,
	due_at: null,
	tags: ['est', 'incididunt', 'nisi'],
	custom_fields: [],
	satisfaction_rating: null,
	sharing_agreement_ids: [],
	fields: [],
	followup_ids: [],
	ticket_form_id: 1900000521007,
	brand_id: 1900000321167,
	allow_channelback: false,
	allow_attachments: true,
};

describe('TicketDetails tests', () => {
	let realUseContext: typeof React.useContext;
	let useContextMock: jest.Mock;
	// Setup mock
	beforeEach(() => {
		realUseContext = React.useContext;
		useContextMock = React.useContext = jest.fn();
	});
	// Cleanup mock
	afterEach(() => {
		React.useContext = realUseContext;
	});

	it('should go to the zendesk page of the ticket, default site', () => {
		React.useContext = realUseContext;
		const details = shallow(<TicketDetails ticket={mockTicket} />);
		window.open = jest.fn();
		details
			.find('Button')
			.filter({ children: 'View on Zendesk' })
			.simulate('click');

		expect(window.open).toHaveBeenCalledWith(
			`https://default.zendesk.com/agent/tickets/${mockTicket.id}`
		);
	});

	it('should go to the zendesk page of the ticket', () => {
		const site = 'sitename';
		useContextMock.mockReturnValue(site);

		const details = shallow(<TicketDetails ticket={mockTicket} />);

		window.open = jest.fn();
		details
			.find('Button')
			.filter({ children: 'View on Zendesk' })
			.simulate('click');

		expect(window.open).toHaveBeenCalledWith(
			`https://${site}.zendesk.com/agent/tickets/${mockTicket.id}`
		);
	});
});
