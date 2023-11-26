import { get, writable, type Writable } from 'svelte/store';
import { recalculateHashRates } from './engine';

function loadStoreFromLocalstorage<T>(key: string, def: T) {
	const stored = localStorage.getItem(key);
	if (stored) {
		try {
			const parsed = JSON.parse(stored);
			return writable(parsed as T)
		} catch {
			localStorage.removeItem(key);
		}
	}
	return writable(def)
}

export const hashCount = loadStoreFromLocalstorage('hashCount', 0);
export const lifetimeHashCount = loadStoreFromLocalstorage('lifetimeHashCount', 0);
export const hashRate = loadStoreFromLocalstorage('hashRate', 0);
export const manualHashValue = loadStoreFromLocalstorage('manualHashValue', 1);

export type ResourceStore = { [key: string]: number }

export const resources = loadStoreFromLocalstorage('resources', {} as ResourceStore);

export type UpgradeStore = {
	ALL: string[],
	[key: string]: string[]
}

export const upgrades = loadStoreFromLocalstorage('upgrades', { ALL: [] } as UpgradeStore);

export const saveData = (stores: { [key: string]: Writable<any>}) => {
	Object.entries(stores).forEach(([key, store]) => {
		localStorage.setItem(key, JSON.stringify(get(store)));
	})
}

const saveableStores = {
	hashCount,
	lifetimeHashCount,
	hashRate,
	manualHashValue,
	resources,
	upgrades
}

let laggedHashCount = get(lifetimeHashCount);

hashCount.subscribe((value) => {
	if(laggedHashCount < value) {
		lifetimeHashCount.update(cur => cur + (value - laggedHashCount))
	}
	laggedHashCount = value;
});

export type Views = 'Home' | 'Upgrades' | 'Resources'

export const view = writable('Home' as Views)

resources.subscribe(res => {
	const { manualHashRate, hashRate: newHashRate } = recalculateHashRates(res, get(upgrades))
	manualHashValue.set(manualHashRate);
	hashRate.set(newHashRate);
	saveData(saveableStores);
})
upgrades.subscribe(upg => {
	const { manualHashRate, hashRate: newHashRate } = recalculateHashRates(get(resources), upg)
	manualHashValue.set(manualHashRate);
	hashRate.set(newHashRate);
	saveData(saveableStores);
})