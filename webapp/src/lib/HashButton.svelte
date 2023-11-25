<script lang="ts">
  import { Button } from "carbon-components-svelte";
  import { hashCount, manualHashValue } from "./stores";
  import { get } from "svelte/store";
</script>

<Button style="font-weight: bold;" on:click={() => {
  hashCount.update((hc) => hc + get(manualHashValue))
}}>HASH</Button>
