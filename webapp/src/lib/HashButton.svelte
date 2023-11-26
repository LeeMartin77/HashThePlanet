<script lang="ts">
  import { Button } from "carbon-components-svelte";
  import { hashCount, manualHashValue } from "./stores";
  import { get } from "svelte/store";
  import ChartMarimekko from "carbon-icons-svelte/lib/ChartMarimekko.svelte";
</script>

<Button style={`
  position: fixed;
  font-weight: bold;
  bottom: 0;
  right: 0;
  z-index: 9999;
  width: 100vw;
`}
icon={ChartMarimekko}
on:click={() => {
  hashCount.update((hc) => hc + get(manualHashValue))
}}>HASH</Button>

<style>
  
</style>