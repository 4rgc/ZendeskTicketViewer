import { Dispatch, SetStateAction, useState } from 'react';

const usePagination: (
	initialPageCount: number,
	initialPage: number
) => [
	{ page: number; pageCount: number },
	Dispatch<SetStateAction<number>>,
	Dispatch<SetStateAction<number>>
] = (initialPageCount: number = 0, initialPage: number = 0) => {
	const [page, setPage] = useState<number>(initialPage);
	const [pageCount, setPageCount] = useState<number>(initialPageCount);

	return [{ page, pageCount }, setPage, setPageCount];
};

export default usePagination;
