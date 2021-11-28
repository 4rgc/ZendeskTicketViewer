import { ZendeskTicket } from '../../types/ZendeskTicket';
import { Button } from '../Button/Button';
import './TicketDetails.css';

export interface TicketDetailsProps {
	ticket: ZendeskTicket;
	onClose?: () => void;
}

export const TicketDetails: React.FC<TicketDetailsProps> = ({
	ticket,
	onClose = () => {},
}) => {
	const onViewOnZendeskClick = () => {
		window.open(
			`https://zccandriib.zendesk.com/agent/tickets/${ticket.id}`
		);
	};

	const shouldDisplayTicket = !!ticket.subject;

	return shouldDisplayTicket ? (
		<div className="tktdet-cont">
			<div className="tktdet-head">
				<h1 className="tktdet-subj">{ticket.subject}</h1>
				<div className="tktdet-status">{ticket.status}</div>
				<Button
					size="square"
					kind="secondary"
					props={{ className: 'tktdet-close-btn' }}
					onClick={onClose}
				>
					x
				</Button>
			</div>
			<span className="tktdet-lb">Description</span>
			<p className="tktdet-desc">{ticket.description}</p>
			<div className="tktdet-foot">
				<div className="tktdet-foot-wrap">
					<div className="tktdet-created-cont">
						<div className="tktdet-lb">Created</div>
						<p className="tktdet-created">{ticket.created_at}</p>
					</div>
					<div className="tktdet-updated-cont">
						<div className="tktdet-lb">Last updated</div>
						<p className="tktdet-updated">{ticket.updated_at}</p>
					</div>
				</div>
				<Button
					size="medium"
					onClick={onViewOnZendeskClick}
					props={{ className: 'tktdet-view-on-zendesk-btn' }}
				>
					View on Zendesk
				</Button>
			</div>
		</div>
	) : (
		<div className="tktdet-cont">
			<div className="tktdet-empty">No ticket selected.</div>
		</div>
	);
};
