<script lang="ts">
  import type { BlogPost } from "$lib/contentful";
  import type { Entry } from "contentful";
  import { image } from "$lib/utils";
  import { Pagination } from "bits-ui";
  import "iconify-icon";

  export let perPage: number;
  export let posts: Entry<BlogPost, "WITHOUT_UNRESOLVABLE_LINKS", string>[];
  export let totalPosts: number;
  export let currPage: number;

  function onPageChange(page: number) {
    window.location.href = `/blog/${page != 1 ? page : ""}`;
  }
</script>

<!-- Grid of posts -->
<section class="text-neutral grid grid-cols-4 gap-xxs">
  {#each posts as item}
    <a
      href={`/posts/${item.fields.slug}`}
      class="group space-y-[0.5rem]"
    >
      <div
        style:background-image="url({image(item.fields.cover?.fields.file?.url)})"
        class="h-40 bg-cover bg-center group-hover:brightness-75 duration-200"
      ></div>
      <h3 class="font-semibold font-jost">{item.fields.title}</h3>
    </a>
  {/each}
</section>

<!-- Pagination -->
<Pagination.Root
  count={totalPosts}
  {perPage}
  page={currPage}
  let:pages
  let:range
  class="w-full flex items-center justify-center gap-2 mt-sm"
  {onPageChange}
>
  <Pagination.PrevButton class="inline-flex items-center justify-center disabled:text-neutral-400">
    <iconify-icon icon="mdi:chevron-left" class="text-4xl"></iconify-icon>
  </Pagination.PrevButton>

  <div class="flex items-center gap-xxs">
    {#each pages as page (page.key)}
      {#if page.type == "ellipsis"}
        <div class="text-sm font-semibold">...</div>
      {:else}
        <Pagination.Page
          {page}
          class="inline-flex justify-center items-center"
        >
          {page.value}
        </Pagination.Page>
      {/if}
    {/each}
  </div>

  <Pagination.NextButton class="inline-flex items-center justify-center disabled:text-neutral-400">
    <iconify-icon icon="mdi:chevron-right" class="text-4xl"></iconify-icon>
  </Pagination.NextButton>
</Pagination.Root>
