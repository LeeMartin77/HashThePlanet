import { get, writable } from 'svelte/store';
import { gameResources, gameUpgrades } from './entities';
import { recalculateHashRates } from './engine';

export const hashCount = writable(0);
export const laggedHashCount = writable(0);
export const lifetimeHashCount = writable(0);
export const hashRate = writable(0);

export const manualHashValue = writable(1);

export type ResourceStore = { [key: string]: number }

export const resources = writable({} as ResourceStore)

export type UpgradeStore = {
	ALL: string[],
	[key: string]: string[]
}

export const upgrades = writable({
	ALL: [],
} as UpgradeStore)

hashCount.subscribe((value) => {
	// we need to find a better way of doing this
	// as this is a very hot code path!
	const prev = get(laggedHashCount);
	if(prev < value) {
		lifetimeHashCount.update(cur => cur + (value - prev))
	}
	laggedHashCount.set(value);
});

export type Views = 'Home' | 'Upgrades' | 'Resources'

export const view = writable('Home' as Views)

resources.subscribe(res => {
	const { manualHashRate, hashRate: newHashRate } = recalculateHashRates(res, get(upgrades))
	manualHashValue.set(manualHashRate);
	hashRate.set(newHashRate)
})
upgrades.subscribe(upg => {
	const { manualHashRate, hashRate: newHashRate } = recalculateHashRates(get(resources), upg)
	manualHashValue.set(manualHashRate);
	hashRate.set(newHashRate)
})