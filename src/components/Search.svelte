<script lang="ts">
  import { Popover } from "bits-ui";
  import DestinationSearch from "$components/DestinationSearch.svelte";

  export let query: string;
  export let search: (query: string) => void;
</script>

<div class="flex h-12 mb-xs">
  <button
    type="submit"
    class="bg-neutral dark:bg-neutral-600 text-white px-xxs text-sm flex items-center gap-1"
  >
    <iconify-icon icon="mdi:magnify" class="text-xl"></iconify-icon>
  </button>

  <form
    on:submit|preventDefault={() => search(query)}
    class="flex items-center flex-grow h-full bg-neutral-200 dark:bg-white text-black pl-xxs"
  >
    <input
      type="text"
      class="h-full w-full outline-none bg-inherit"
      placeholder="Search for posts..."
      bind:value={query}
    />

    {#if query}
      <button
        on:click={() => (query = "")}
        class="text-xl flex items-center justify-center aspect-square ml-2"
      >
        <iconify-icon icon="mdi:close"></iconify-icon>
      </button>
    {/if}

    <Popover.Root>
      <Popover.Trigger class="flex items-center h-full gap-1 rounded-md px-xxs uppercase font-jost tracking-widest font-medium text-sm">
        <iconify-icon icon="mdi:filter-variant" class="text-xl"></iconify-icon>
        <span>Filter</span>
      </Popover.Trigger>

      <Popover.Content
        class="flex flex-col gap-xxs items-start bg-white dark:bg-neutral text-neutral dark:text-white rounded-md w-[20rem] h-lg p-xxs shadow-lg"
        sideOffset={8}
        align="start"
      >
        <h2 class="uppercase font-jost font-medium tracking-widest">
          Destinations
        </h2>
        <DestinationSearch />
      </Popover.Content>
    </Popover.Root>
  </form>
</div>
