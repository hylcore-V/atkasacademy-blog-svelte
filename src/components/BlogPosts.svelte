<script lang="ts">
  import type { BlogPost } from "$lib/contentful";
  import { clamp, image } from "$lib/utils";
  import type { Entry } from "contentful";
  import "iconify-icon";
  import { onMount } from "svelte";
  import Pagination from "./Pagination.svelte";

  export let page: number;
  export let query: string | null;

  const perPage = 12;

  let loading = true;
  let queryInput = query;
  let allPosts: Entry<BlogPost, "WITHOUT_UNRESOLVABLE_LINKS", string>[] = [];
  let posts: Entry<BlogPost, "WITHOUT_UNRESOLVABLE_LINKS", string>[] = [];

  function search() {
    if (!queryInput) return;
    const query = encodeURIComponent(queryInput);
    window.location.href = `/blog?page=1&q=${query}`;
  }

  function pageChange(page: number) {
    window.location.href = `/blog?page=${page}&q=${query}`;
  }

  onMount(async () => {
    loading = true;

    allPosts = await fetch("/api/posts.json", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query })
    }).then(response => response.json()) as Entry<BlogPost, "WITHOUT_UNRESOLVABLE_LINKS", string>[];

    const clampedPage = clamp(page - 1, 0);
    posts = allPosts.slice(clampedPage * perPage, (clampedPage + 1) * perPage);

    loading = false;
  });
</script>

<div class="flex h-12 mb-xs">
  <form
    on:submit|preventDefault={search}
    class="flex items-center flex-grow h-full bg-neutral-200 dark:bg-white text-black rounded-l-md pl-xxs"
  >
    <input
      type="text"
      class="h-full w-full outline-none bg-inherit"
      placeholder="Search for posts..."
      bind:value={queryInput}
    />

    <button
      on:click|preventDefault
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

<!-- Grid of posts -->
<section class="text-neutral dark:text-white grid grid-cols-4 gap-xxs">
  {#each posts as item}
    <a
      href={`/posts/${item.fields.slug}`}
      class="group space-y-[0.5rem]"
    >
      <div
        style:background-image="url({image(item.fields.cover?.fields.file?.url)})"
        class="h-40 bg-cover bg-center group-hover:brightness-75 duration-200 rounded-md"
      ></div>
      <h3 class="font-[500]">{item.fields.title}</h3>
    </a>
  {/each}
</section>

{#if !loading}
  {#if posts.length > 0}
    <Pagination
      {perPage}
      count={allPosts.length}
      currPage={page}
      onPageChange={pageChange}
    />
  {:else}
    <div class="flex justify-center items-center font-semibold text-xl">
      Sorry, it looks like no posts were found for your search :(
    </div>
  {/if}
{/if}

{#if loading}
  <div class="w-full mt-sm flex justify-center">
    <iconify-icon icon="mdi:loading" class="text-4xl animate-spin"></iconify-icon>
  </div>
{/if}
