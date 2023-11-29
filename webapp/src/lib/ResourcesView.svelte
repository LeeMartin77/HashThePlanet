<script lang="ts">
    import { Grid, Row, Column, ClickableTile } from "carbon-components-svelte";
    import { lifetimeHashCount, hashCount, resources, upgrades } from "./stores";
    import { gameResources, type Resource } from "./entities";
    import { get } from "svelte/store";
    import { calculateResourceHashRate } from "./engine";

    const cost = (res: Resource, currentCount: number) => {
        if (!currentCount) {
            return res.baseCost;
        }
        return Math.floor(Math.pow(res.baseCost, (1 + (currentCount/10) * res.costMultiplier)));
    }

    const canPurchase = (res: Resource, hc: number, cc: number): boolean => {
        return hc >= cost(res, cc);
    }

    const purchase = (res: Resource) => {
        const currCount = get(resources)[res.key] ?? 0;
        if (!canPurchase(res, get(hashCount), currCount)) {
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

<h1>Resources</h1>
<Grid>
    <Row>
        <Column>
            {#each Object.entries(gameResources) as [, pres]}
                {#if pres.visibleAtLifetime <= $lifetimeHashCount}
                    <ClickableTile disabled={!canPurchase(pres, $hashCount, $resources[pres.key] ?? 0)} on:click={() => purchase(pres)}>
                        {pres.name}
                        {$resources[pres.key] ?? 0} 
                        <p>Provides {calculateResourceHashRate(pres, $resources[pres.key] ?? 0, $upgrades[pres.key]).toFixed(2)} Hashes a Second</p>
                        <p>Cost: {cost(pres, $resources[pres.key] ?? 0)} Hashes</p>
                    </ClickableTile>
                {/if}
            {/each}
        </Column>
    </Row>
</Grid>
