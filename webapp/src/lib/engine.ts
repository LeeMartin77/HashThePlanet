
// this is the big cheese

import { gameResources, gameUpgrades, type Resource, type Upgrade } from "./entities";
import type { ResourceStore, UpgradeStore } from "./stores";

type RequiredUpgradeData = Pick<Upgrade, 'effect'>;
type RequiredResourceData = Pick<Resource, 'baseHashRate'>;

export const calculateResourceHashRate = (res: RequiredResourceData, count: number, upgrades: string[] | undefined, fnGameUpgrades: { [key: string]: RequiredUpgradeData } = gameUpgrades) => {
	if (upgrades) {
		return upgrades.reduce<number>((acc, upgrdKey) => {
			if (fnGameUpgrades[upgrdKey]) {
				return fnGameUpgrades[upgrdKey].effect(acc, res.baseHashRate, count);
			}
			return acc;
		}, res.baseHashRate)
	}
	return res.baseHashRate
}

export const recalculateHashRates = (
  resources: ResourceStore,
  upgrd: UpgradeStore,
  fnGameResources: { [key: string]: RequiredResourceData } = gameResources,
  fnGameUpgrades: { [key: string]: RequiredUpgradeData } = gameUpgrades
) => {
	const hashRate = Object.entries(resources).reduce<number>((acc, [key, count]) => {
			return acc + (calculateResourceHashRate(fnGameResources[key], count, upgrd[key], fnGameUpgrades) * count)
	}, 0)
	return {
    manualHashRate: 1,
    hashRate
  }
}
