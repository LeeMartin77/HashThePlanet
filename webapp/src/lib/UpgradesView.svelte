<script lang="ts">
    import { Grid, Row, Column, Tile, Button } from "carbon-components-svelte";
    import { lifetimeHashCount, hashCount, upgrades } from "./stores";
    import { gameUpgrades, type Upgrade } from "./entities";
    import { get } from "svelte/store";


    const canPurchase = (res: Upgrade, hc: number): boolean => {
        return hc >= res.cost;
    }

    const purchase = (res: Upgrade) => {
        if (!canPurchase(res, get(hashCount))) {
            return;
        }
        const payHashes = res.cost;
        hashCount.update((curr) => curr - payHashes);
        // I think this is a weird stores thing
        const curr = get(upgrades);
        
        upgrades.update((curr) => {
            curr.ALL.push(res.key);
            for (const affected of res.affects) {
                if (curr[affected]) {
                    curr[affected].push(res.key);
                } else {
                    curr[affected] = [res.key];
                }
            }

            return curr;
        });
    }

</script>

<Grid>
    <Row>
        <h2>Upgrades</h2>
    </Row>
    <Row>
        <Column>
            {#each Object.entries(gameUpgrades) as [, pres]}
                {#if !$upgrades.ALL.includes(pres.key) && pres.visibleAtLifetime <= $lifetimeHashCount && pres.prerequesites.every(pr => $upgrades.ALL.includes(pr))}
                    <Tile>
                        <h4>{pres.name}</h4>
                        <p>{pres.effectSummary}</p>
                        <Button disabled={!canPurchase(pres, $hashCount)} on:click={() => purchase(pres)}>Cost: {pres.cost} Hashes</Button>
                    </Tile>
                {/if}
            {/each}
        </Column>
    </Row>
</Grid>
