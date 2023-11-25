import { get, writable } from 'svelte/store';
import { gameResources } from './entities';

export const hashCount = writable(0);
export const laggedHashCount = writable(0);
export const lifetimeHashCount = writable(0);
export const hashRate = writable(0);

export const manualHashValue = writable(1);

export const resources = writable({} as { [key: string]: number })

hashCount.subscribe((value) => {
	const prev = get(laggedHashCount);
	if(prev < value) {
		lifetimeHashCount.update(cur => cur + (value - prev))
	}
	laggedHashCount.set(value);
});

export type Views = 'Home' | 'Upgrades' | 'Resources'

export const view = writable('Home' as Views)

// this is the big cheese

const recalculateHashRates = () => {
	// just resources for now - upgrades later.
	const newHashRate = Object.entries(get(resources)).reduce<number>((acc, [key, count]) => {
		return acc + (gameResources[key].baseHashRate * count)
	}, 0)

	hashRate.set(newHashRate)
}

resources.subscribe(() => recalculateHashRates())