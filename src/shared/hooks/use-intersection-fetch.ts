import React from 'react';
import { useIntersection } from 'react-use';

export const useIntersectionFetch = (hasNextPage: boolean, fetchNextPage: () => void) => {
	const intersectionRef = React.useRef<HTMLDivElement | null>(null);
	const intersection = useIntersection(intersectionRef, {
		root: null,
		rootMargin: '0px',
		threshold: 0.5,
	});

	React.useEffect(() => {
		if (intersection || hasNextPage) {
			fetchNextPage();
		}
	}, [intersection, fetchNextPage, hasNextPage]);

	return intersectionRef;
};
