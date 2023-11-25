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
    }
}