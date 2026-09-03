import { createContext } from 'svelte';
import type { Writable } from 'svelte/store';

export type ObserveStore = Writable<string | null>;

export const [getObserveContext, setObserveContext] = createContext<ObserveStore>();

export function observeIntersection({
	store,
	threshold,
}: {
	store: ObserveStore;
	threshold?: number;
}) {
	return function attachment(element: Element) {
		const observer = new IntersectionObserver(
			(observedElements) => {
				const observedId = observedElements
					.find((x) => x.isIntersecting)
					?.target.attributes.getNamedItem('data-observable-id')?.value;

				if (observedId) store.set(observedId);
			},
			{ root: null, rootMargin: `0px`, threshold },
		);

		const observables = element.querySelectorAll('[data-observable-id]');

		for (const observable of observables) {
			observer.observe(observable);
		}

		return () => {
			for (const observable of observables) {
				observer.unobserve(observable);
			}
			observer.disconnect();
		};
	};
}

export function createIntersectionObservable(id: string) {
	return { 'data-observable-id': id };
}
