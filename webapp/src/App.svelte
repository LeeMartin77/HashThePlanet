<script>
  import "carbon-components-svelte/css/g100.css";
  import HashButton from "./lib/HashButton.svelte";
  import { hashCount, hashRate } from "./lib/core";
</script>
<p>Count is: {$hashCount.toFixed(2)}</p>
<p>Hashrate is: {$hashRate.toFixed(2)}</p>
<HashButton>Primary button</HashButton>