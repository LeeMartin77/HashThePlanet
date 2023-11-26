<script lang="ts">
  import "carbon-components-svelte/css/g100.css";
  import HashButton from "./lib/HashButton.svelte";
  import { hashCount, hashRate, view, upgrades, resources } from "./lib/stores";
  import type { Views } from './lib/stores';
  import {
    Header, Button,
    Grid, Row, Column,
    HeaderAction, SideNavItems, Content,
     SideNavMenuItem, Theme, Tile


} from 'carbon-components-svelte';
    import HomeView from "./lib/HomeView.svelte";
    import UpgradesView from "./lib/UpgradesView.svelte";
    import ResourcesView from "./lib/ResourcesView.svelte";

const menuViews: Views[] = ['Home', 'Upgrades', 'Resources']

</script>


<Theme theme='g100'>
  <Header>
    <span slot="company">
      HTP2000cx.VMCT.BNG12
    </span>
    <span slot="platform">
      <div style="padding-left: 1em;">{$hashCount.toFixed(2)} {$hashRate.toFixed(2)}/s</div>
    </span>
    <HeaderAction>
      <SideNavItems>
        {#each menuViews as mview}
        <SideNavMenuItem>
          <Button on:click={() => view.set(mview)}>{mview}</Button>
        </SideNavMenuItem>
        {/each}
      </SideNavItems>
    </HeaderAction>
  </Header>
</Theme>
<Content>
  <Tile>
    <h4>Debugger</h4>
    <h5>Upgrades</h5>
    <pre>{JSON.stringify($upgrades, undefined, 2)}</pre>
    <h5>Resources</h5>
    <pre>{JSON.stringify($resources, undefined, 2)}</pre>
  </Tile>
  <HashButton />
  {#if $view === 'Home'}
    <HomeView />
  {:else if $view === 'Upgrades'}
    <UpgradesView />
  {:else if $view === 'Resources'}
    <ResourcesView />
  {/if}
</Content>