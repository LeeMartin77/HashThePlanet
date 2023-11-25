<script lang="ts">
    import { Grid, Row, Column, Tile, Button } from "carbon-components-svelte";
    import { lifetimeHashCount, hashCount, resources } from "./stores";
    import { gameResources, type Resource } from "./entities";
    import { get } from "svelte/store";


    const cost = (res: Resource, currentCount: number) => {
        if (!currentCount) {
            return res.baseCost;
        }
        return Math.floor(Math.pow(res.baseCost, (1 + (currentCount/10) * res.costMultiplier)));
    }

    const canPurchase = (res: Resource, lhc: number, hc: number, cc: number): boolean => {
        return res.unlocksAtLifetime <= lhc && hc >= cost(res, cc);
    }

    const purchase = (res: Resource) => {
        const currCount = get(resources)[res.key] ?? 0;
        if (!canPurchase(res, get(lifetimeHashCount), get(hashCount), currCount)) {
            return;
        }
        const payHashes = cost(res, currCount);
        hashCount.update((curr) => curr - payHashes);
        resources.update((curr) => {
            if (curr[res.key]) {
                curr[res.key] += 1;
            } else {
                curr[res.key] = 1;
            }
            return curr;
        });
    }

</script>

<Grid>
    <Row>
        <h2>Resources</h2>
    </Row>
    <Row>
        <Column>
            {#each Object.entries(gameResources) as [, pres]}
                {#if pres.visibleAtLifetime <= $lifetimeHashCount}
                    <Tile>
                        <h4>{$resources[pres.key] ?? 0} {pres.name}</h4>
                        {#if pres.unlocksAtLifetime > $lifetimeHashCount}
                            <h6>Unlocks in {pres.unlocksAtLifetime - $lifetimeHashCount} hashes</h6>
                        {/if}
                        <p>Provides {pres.baseHashRate.toFixed(2)} Hashes a Second</p>
                        <Button disabled={!canPurchase(pres, $lifetimeHashCount, $hashCount, $resources[pres.key] ?? 0)} on:click={() => purchase(pres)}>Cost: {cost(pres, $resources[pres.key] ?? 0)} Hashes</Button>
                    </Tile>
                {/if}
            {/each}
        </Column>
    </Row>
</Grid>
