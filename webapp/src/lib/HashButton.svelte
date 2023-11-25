<script lang="ts">
  import { Button } from "carbon-components-svelte";
  import { hashCount } from "./stores";
</script>

<Button on:click={() => {
  hashCount.update((hc) => hc + 1)
}}>Primary button</Button>
