<script lang="ts">
  import { Popover } from "bits-ui";
  import DestinationSearch from "$components/DestinationSearch.svelte";

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

    <Popover.Root>
      <Popover.Trigger class="flex items-center h-full gap-1 rounded-md px-xxs uppercase font-jost tracking-widest font-medium text-sm">
        <iconify-icon icon="mdi:filter-variant" class="text-xl"></iconify-icon>
        <span>Filter</span>
      </Popover.Trigger>

      <Popover.Content
        class="flex flex-col gap-xxs items-start bg-white text-neutral rounded-md w-lg h-lg p-xxs shadow-lg"
        sideOffset={8}
        align="start"
      >
        <h2 class="uppercase font-jost font-medium text-sm tracking-widest">
          Destinations
        </h2>
        <DestinationSearch />
      </Popover.Content>
    </Popover.Root>
  </form>

  <button
    type="submit"
    class="bg-neutral dark:bg-neutral-600 text-white rounded-r-md px-xxs text-sm flex items-center gap-1"
  >
    <iconify-icon icon="mdi:magnify" class="text-xl"></iconify-icon>
  </button>
</div>
