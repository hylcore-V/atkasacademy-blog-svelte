<script lang="ts">
  import type { EventHandler } from "svelte/elements";

  export let query = "";
  export let search: (query: string) => void;
</script>

<div class="flex h-12 mb-xs">
  <form
    on:submit|preventDefault={() => search(query)}
    class="flex items-center flex-grow h-full bg-neutral-200 dark:bg-white text-black rounded-l-md pl-xxs"
  >
    <input
      type="text"
      class="h-full w-full outline-none bg-inherit"
      placeholder="Search for posts..."
      bind:value={query}
    />

    <button
      class="flex items-center h-full gap-1 rounded-md px-xxs uppercase font-jost tracking-widest font-medium text-sm"
    >
      <iconify-icon icon="mdi:filter-variant" class="text-xl"></iconify-icon>
      Filter
    </button>
  </form>

  <button
    type="submit"
    class="bg-neutral dark:bg-neutral-600 text-white rounded-r-md px-xxs text-sm flex items-center gap-1"
  >
    <iconify-icon icon="mdi:magnify" class="text-xl"></iconify-icon>
  </button>
</div>
