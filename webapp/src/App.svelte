<script lang="ts">
  import "carbon-components-svelte/css/g100.css";
  import HashButton from "./lib/HashButton.svelte";
  import { hashCount, hashRate, view, type Views } from "./lib/stores";
  import { Header, Content, Theme, Button, SideNav, Grid, Row, Column, SideNavItems, SideNavLink } from 'carbon-components-svelte';
  import HomeView from "./lib/HomeView.svelte";
  import Home from "carbon-icons-svelte/lib/Home.svelte";
  import Tools from "carbon-icons-svelte/lib/Tools.svelte";

  const pageViews: Views[] = ['Home', 'Utilities'] 

  let isSideNavOpen = false;
</script>


<Theme theme='g100'>
  <Header bind:isSideNavOpen>
    <span slot="company">
      HTP2000cx.VMCT.BNG12
    </span>
    <span slot="platform">
      <div style="padding-left: 1em;">{$hashCount.toFixed(2)} {$hashRate.toFixed(2)}/s</div>
    </span>
  </Header>
  <SideNav rail>
  </SideNav>
  <SideNav bind:isOpen={isSideNavOpen} rail>
    <SideNavItems>
      <SideNavLink icon={Home} text="Home" on:click={()=> view.set('Home')}/>
      <SideNavLink icon={Tools} text="Utilities" on:click={()=> view.set('Utilities')}/>
    </SideNavItems>
  </SideNav>
</Theme>
<Content>
  {#if $view === 'Home'}
    <HomeView />
  {:else if $view === 'Utilities'}
    <Grid>
      <Row>
        <Column>
          <h1>Utilities</h1>
          <Button kind="danger" on:click={() => {	localStorage.clear();location.reload();}}>Clear Data</Button>
        </Column>
      </Row>
    </Grid>
  {/if}

</Content>
<HashButton />