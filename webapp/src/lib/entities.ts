export type Resource = {
    name: string;
    key: string; // some data duping here but this makes life a bit easier elsewhere
    visibleAtLifetime: number;
    baseHashRate: number;
    baseCost: number;
    costMultiplier: number; 
}


export const gameResources: {[key: string] : Resource} = {
    AUTOHASH_PROGRAM: {
        name: 'Autohash.exe',
        key: 'AUTOHASH_PROGRAM',
        visibleAtLifetime: 10,
        baseHashRate: 0.1,
        baseCost: 15,
        costMultiplier: 1.1
    },
    AUTOHASH_NETWORK: {
        name: 'Networked Hasher',
        key: 'AUTOHASH_NETWORK',
        visibleAtLifetime: 400,
        baseHashRate: 2,
        baseCost: 500,
        costMultiplier: 1.2
    }
}


export type Upgrade = {
    name: string;
    effectSummary: string;
    key: string; // some data duping here but this makes life a bit easier elsewhere
    visibleAtLifetime: number;
    affects: string[];
    prerequesites: string[];
    cost: number;
    effect: (accumulatedRate: number, baseHashRate: number, count: number) => number
}

export const gameUpgrades: {[key: string] : Upgrade} = {
    AUTOHASH_PATCH_1: {
        name: 'Autohash.exe Memory Patch',
        key: 'AUTOHASH_PATCH_1',
        effectSummary: 'Patches a memory leak in Autohash.exe - 50% improvement',
        visibleAtLifetime: 50,
        affects: ['AUTOHASH_PROGRAM'],
        prerequesites: [],
        cost: 200,
        effect: (acc, bhr, cnt) => acc * 1.5
    },
    AUTOHASH_PATCH_2: {
        name: 'Autohash.exe Multithread Enhancement',
        key: 'AUTOHASH_PATCH_2',
        effectSummary: 'Make use of all cores for hashing - doubles performance',
        visibleAtLifetime: 600,
        affects: ['AUTOHASH_PROGRAM'],
        prerequesites: ['AUTOHASH_PATCH_1'],
        cost: 1500,
        effect: (acc, bhr, cnt) => acc * 2
    }
}
