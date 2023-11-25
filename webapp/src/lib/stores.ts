import { writable } from 'svelte/store';

export const hashCount = writable(0);
export const hashRate = writable(0);

hashCount.subscribe((value) => {
	//console.log(value);
}); // logs '0'
// We are gonna go "old school"

export type Views = 'Home' | 'Upgrades'

export const view = writable('Home' as Views)

export const sidebarOpen = writable(false);

// count.set(1); // logs '1'

// count.update((n) => n + 1); // logs '2'

