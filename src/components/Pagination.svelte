<script lang="ts">
  import { Pagination } from "bits-ui";

  export let perPage: number;
  export let count: number;
  export let currPage: number;
  export let onPageChange: (page: number) => void;
</script>

<Pagination.Root
  count={count}
  {perPage}
  page={currPage}
  let:pages
  class="w-full flex items-center justify-center gap-2 mt-sm"
  {onPageChange}
>
  <Pagination.PrevButton class="inline-flex items-center justify-center disabled:text-neutral-400 disabled:cursor-not-allowed size-[2.5rem] hover:bg-neutral-100 dark:hover:bg-neutral-600 rounded-md duration-150">
    <iconify-icon icon="mdi:chevron-left" class="text-2xl"></iconify-icon>
  </Pagination.PrevButton>

  <div class="flex items-center gap-2">
    {#each pages as page (page.key)}
      {#if page.type == "ellipsis"}
        <div class="text-sm font-semibold">...</div>
      {:else}
        <Pagination.Page
          {page}
          class="inline-flex justify-center items-center size-[2.5rem] rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-600 data-[selected]:bg-neutral dark:data-[selected]:bg-white duration-150 data-[selected]:text-white dark:data-[selected]:text-neutral font-normal"
        >
          {page.value}
        </Pagination.Page>
      {/if}
    {/each}
  </div>

  <Pagination.NextButton class="inline-flex items-center justify-center disabled:text-neutral-400 disabled:cursor-not-allowed size-[2.5rem] hover:bg-neutral-100 dark:hover:bg-neutral-600 rounded-md duration-150">
    <iconify-icon icon="mdi:chevron-right" class="text-2xl"></iconify-icon>
  </Pagination.NextButton>
</Pagination.Root>
