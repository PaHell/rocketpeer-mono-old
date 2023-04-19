import { writable, type Updater, type Writable } from 'svelte/store';
import { RowState, type RowContext } from './Row.svelte';

export interface RowContextStore<T> extends Writable<RowContext<T>> {
	set(this: void, value: RowContext<T>): void;
	update: (this: void, updater: Updater<RowContext<T>>) => void;
	// custom
	setState: (state: RowState) => void;
	updateItem: <TProp>(key: keyof T, value: TProp) => void;
}

export function createRowContextStore<T>(
	item: T,
	index: number,
	state: RowState
): RowContextStore<T> {
	console.log('createRowContextStore', { id: item?.id, state });
	const context: RowContext<T> = {
		index,
		item,
		state,
		initialState: state
	};
	const { subscribe, set, update } = writable(context);
	return {
		subscribe,
		set,
		update,
		setState: (state: RowState) => {
			update((context) => {
				context.state = state;
				return context;
			});
		},
		updateItem: (key: keyof T, value: any) => {
			update((context) => {
				if (context.state === RowState.Unmodified) context.state = RowState.Modified;
				context.item[key] = value;
				return context;
			});
		}
	};
}
