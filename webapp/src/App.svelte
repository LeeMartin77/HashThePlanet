<script lang="ts">
  import "carbon-components-svelte/css/g100.css";
  import HashButton from "./lib/HashButton.svelte";
  import { hashCount, hashRate } from "./lib/stores";
  import { Header, Content, Theme, Button } from 'carbon-components-svelte';
  import HomeView from "./lib/HomeView.svelte";

</script>


<Theme theme='g100'>
  <Header>
    <span slot="company">
      HTP2000cx.VMCT.BNG12
    </span>
    <span slot="platform">
      <div style="padding-left: 1em;">{$hashCount.toFixed(2)} {$hashRate.toFixed(2)}/s</div>
    </span>
  </Header>
</Theme>
<Content>
    <HomeView />
</Content>
<HashButton />
<Button kind="danger" on:click={() => {	localStorage.clear();location.reload();}}>Clear Data</Button>