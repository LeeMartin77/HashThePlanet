
// this is the big cheese

import { gameResources, gameUpgrades, type Resource, type Upgrade } from "./entities";
import type { ResourceStore, UpgradeStore } from "./stores";

type RequiredUpgradeData = Pick<Upgrade, 'effect'>;
type RequiredResourceData = Pick<Resource, 'baseHashRate'>;

export const recalculateHashRates = (
  resources: ResourceStore,
  upgrd: UpgradeStore,
  fnGameResources: { [key: string]: RequiredResourceData } = gameResources,
  fnGameUpgrades: { [key: string]: RequiredUpgradeData } = gameUpgrades
) => {
	const hashRate = Object.entries(resources).reduce<number>((acc, [key, count]) => {
		if (upgrd[key]) {
			return acc + (upgrd[key].reduce<number>((acc, upgrdKey) => {
				if (fnGameUpgrades[upgrdKey]) {
					return fnGameUpgrades[upgrdKey].effect(acc, fnGameResources[key].baseHashRate, count);
				}
				return acc;
			}, fnGameResources[key].baseHashRate) * count)
		}
		return acc + (fnGameResources[key].baseHashRate * count)
	}, 0)
	return {
    manualHashRate: 1,
    hashRate
  }
}
