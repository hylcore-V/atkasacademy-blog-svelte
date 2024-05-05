<script lang="ts">
  import type { Destination } from "$lib/contentful";
  import type { Entry } from "contentful";
  import { onMount } from "svelte";

  let loading = true;

  let destinations: Entry<Destination, "WITHOUT_UNRESOLVABLE_LINKS", string>[] = [];

  async function loadDestinations() {
    loading = true;
    destinations = await fetch("/api/destinations.json", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }).then(response => response.json()) as Entry<Destination, "WITHOUT_UNRESOLVABLE_LINKS", string>[];

    loading = false;
  }

  onMount(loadDestinations);
</script>

{#if loading}
  <div class="flex justify-center items-center w-full">
    <iconify-icon icon="mdi:loading" class="text-xl animate-spin"></iconify-icon>
  </div>
{:else}
  <div class="w-[20rem] h-[20rem] overflow-auto">

  </div>
{/if}

