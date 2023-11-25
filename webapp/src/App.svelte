<script lang="ts">
  import "carbon-components-svelte/css/g100.css";
  import HashButton from "./lib/HashButton.svelte";
  import { hashCount, hashRate, view, sidebarOpen } from "./lib/stores";
  import type { Views } from './lib/stores';
  import {
    Header, Button,
    Grid, Row, Column,
    HeaderGlobalAction, SideNav, SideNavItems, Content,
     SideNavMenuItem, Theme

} from 'carbon-components-svelte';

const menuViews: Views[] = ['Home', 'Upgrades']

</script>


<Theme theme='g100'>
  <Header company="HTP2000cx.VMCT.BNG12" isSideNavOpen>
    <slot name="platform">
      <div style="padding-left: 1em;">{$hashCount.toFixed(2)}</div>
      <div style="padding-left: 1em;">{$hashRate.toFixed(2)}/s</div>
    </slot>
    <slot name="skip-to-content">
      <HashButton />
    </slot>
  </Header>
  <SideNav>
    <SideNavItems>
      {#each menuViews as mview}
      <SideNavMenuItem>
        <Button on:click={() => view.set(mview)}>{mview}</Button>
      </SideNavMenuItem>
      {/each}
    </SideNavItems>
  </SideNav>
</Theme>
<Content>
  <Grid fullWidth>
    <Row>
      <Column>
      </Column>
    </Row>
    {#if $view === 'Home'}
      <p>Count is: </p>
      <p>Hashrate is: </p>
    {:else if $view === 'Upgrades'}
      <div>Upgrades here</div>
    {/if}
  </Grid>
</Content>