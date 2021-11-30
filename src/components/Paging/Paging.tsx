import './Paging.css';
import { Button } from '../Button/Button';

export type PagingProps = {
	pageCount: number;
	page: number;
	showPrevNext?: boolean;
	size: 'small' | 'large';
	onPageSelected: (page: number) => void;
	onNextSelected: () => void;
	onPrevSelected: () => void;
};

export const Paging: React.FC<PagingProps> = ({
	pageCount,
	page,
	showPrevNext = false,
	size = 'small',
	onPageSelected,
	onNextSelected,
	onPrevSelected,
}) => {
	let pageButtonNumber = 0;
	switch (size) {
		case 'small':
			pageButtonNumber = 5;
			break;
		case 'large':
			pageButtonNumber = 7;
			break;
	}

	const maxPage = pageCount ? pageCount - 1 : 0;

	let pageButtons = [];
	if (pageCount <= pageButtonNumber) {
		for (let i = 0; i < pageCount; i++) {
			pageButtons.push(i);
		}
	} else if (page < pageButtonNumber - 2) {
		for (let i = 0; i < pageButtonNumber - 1; i++) {
			pageButtons.push(i);
		}
		pageButtons.push(-1);
	} else if (maxPage - page < pageButtonNumber - 2) {
		pageButtons.push(-1);
		for (let i = maxPage - pageButtonNumber + 2; i < pageCount; i++) {
			pageButtons.push(i);
		}
	} else {
		pageButtons.push(-1);
		for (let i = page - 1; i < page + 2; i++) {
			pageButtons.push(i);
		}
		pageButtons.push(-1);
	}

	return (
		<div className="paging-cont">
			{showPrevNext && (
				<Button
					size="square"
					onClick={onPrevSelected}
					props={{ className: 'paging-btn' }}
					disabled={page === 0}
				>
					{'<'}
				</Button>
			)}
			{pageButtons.map((p, ind) => (
				<Button
					key={ind}
					size="square"
					onClick={p === -1 ? undefined : () => onPageSelected(p)}
					props={{ className: 'paging-btn' }}
				>
					{p === -1 ? '...' : p + 1}
				</Button>
			))}
			{showPrevNext && (
				<Button
					size="square"
					onClick={onNextSelected}
					props={{ className: 'paging-btn' }}
					disabled={page === maxPage}
				>
					{'>'}
				</Button>
			)}
		</div>
	);
};
