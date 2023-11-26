export type Resource = {
    name: string;
    key: string; // some data duping here but this makes life a bit easier elsewhere
    unlocksAtLifetime: number;
    visibleAtLifetime: number;
    baseHashRate: number;
    baseCost: number;
    costMultiplier: number; 
}


export const gameResources: {[key: string] : Resource} = {
    AUTOHASH_PROGRAM: {
        name: 'Autohash.exe',
        key: 'AUTOHASH_PROGRAM',
        unlocksAtLifetime: 20,
        visibleAtLifetime: 10,
        baseHashRate: 0.1,
        baseCost: 10,
        costMultiplier: 1.1
    },
    AUTOHASH_NETWORK: {
        name: 'Networked Hasher',
        key: 'AUTOHASH_NETWORK',
        unlocksAtLifetime: 1200,
        visibleAtLifetime: 600,
        baseHashRate: 2,
        baseCost: 750,
        costMultiplier: 1.2
    }
}


export type Upgrade = {
    name: string;
    effectSummary: string;
    key: string; // some data duping here but this makes life a bit easier elsewhere
    unlocksAtLifetime: number;
    visibleAtLifetime: number;
    affects: string[];
    prerequesites: string[];
    cost: number;
    effect: (accumulatedRate: number, res: Resource, count: number) => number
}

export const gameUpgrades: {[key: string] : Upgrade} = {
    AUTOHASH_PROGRAM_V2: {
        name: 'Autohash.exe Memory Patch',
        key: 'AUTOHASH_PATCH_1',
        effectSummary: 'Patches a memory leak in Autohash.exe - 50% improvement',
        unlocksAtLifetime: 30, //300
        visibleAtLifetime: 5, //50
        affects: ['AUTOHASH_PROGRAM'],
        prerequesites: [],
        cost: 4, //400
        effect: (accumulatedRate: number) => accumulatedRate * 0.5
    },
    AUTOHASH_PROGRAM_V3: {
        name: 'Autohash.exe Multithread Enhancement',
        key: 'AUTOHASH_PATCH_2',
        effectSummary: 'Make use of all cores for hashing - doubles performance',
        unlocksAtLifetime: 800,
        visibleAtLifetime: 600,
        affects: ['AUTOHASH_PROGRAM'],
        prerequesites: ['AUTOHASH_PROGRAM_V2'],
        cost: 1500,
        effect: (accumulatedRate: number) => accumulatedRate * 2
    }
}
