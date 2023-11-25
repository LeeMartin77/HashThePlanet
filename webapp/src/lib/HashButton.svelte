<script lang="ts">
  import { Button } from "carbon-components-svelte";
  import { hashCount } from "./stores";
</script>

<Button style="width: 100%; font-weight: bold; right: 0;" on:click={() => {
  hashCount.update((hc) => hc + 1)
}}>HASH</Button>
