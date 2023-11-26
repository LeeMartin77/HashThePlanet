import { get, writable } from 'svelte/store';
import { gameResources, gameUpgrades } from './entities';

export const hashCount = writable(0);
export const laggedHashCount = writable(0);
export const lifetimeHashCount = writable(0);
export const hashRate = writable(0);

export const manualHashValue = writable(1);

export const resources = writable({} as { [key: string]: number })
export const upgrades = writable({
	ALL: [],
} as {
	ALL: string[],
	[key: string]: string[]
})

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
	const upgrd = get(upgrades);
	const newHashRate = Object.entries(get(resources)).reduce<number>((acc, [key, count]) => {
		if (upgrd[key]) {
			return acc + (upgrd[key].reduce<number>((acc, upgrdKey) => {
				if (gameUpgrades[upgrdKey]) {
					return gameUpgrades[upgrdKey].effect(acc, gameResources[key], count);
				}
				return acc;
			}, gameResources[key].baseHashRate) * count)
		}
		return acc + (gameResources[key].baseHashRate * count)
	}, 0)
	hashRate.set(newHashRate)
}

resources.subscribe(() => recalculateHashRates())
upgrades.subscribe(() => recalculateHashRates())