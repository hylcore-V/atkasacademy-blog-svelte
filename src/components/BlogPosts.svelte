<script lang="ts">
  import type { BlogPost } from "$lib/contentful";
  import { image } from "$lib/utils";
  import type { Entry } from "contentful";
  import "iconify-icon";
  import { onMount } from "svelte";

  export let page: number;
  export let query: string | null;

  const perPage = 12;

  let loading = false;
  let queryInput = query;
  let posts: Entry<BlogPost, "WITHOUT_UNRESOLVABLE_LINKS", string>[] = [];

  function search() {
    window.location.href = `/blog?page=${page}&q=${queryInput}`;
  }

  onMount(async () => {
    loading = true;

    posts = await fetch("/api/posts.json", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ perPage, page, query })
    }).then(response => response.json());

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
      type="submit"
      class="flex items-center h-full gap-1 rounded-md px-xxs uppercase font-jost tracking-widest font-medium text-sm"
    >
      <iconify-icon icon="mdi:filter-variant" class="text-xl"></iconify-icon>
      Filter
    </button>
  </form>
  <button class="bg-neutral dark:bg-neutral-600 text-white rounded-r-md px-xxs text-sm flex items-center gap-1">
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

{#if posts.length === 0 && !loading}
  <div class="flex justify-center items-center font-semibold text-xl">
    Sorry, it looks like no posts were found for your search :(
  </div>
{/if}

{#if loading}
  <div class="w-full mt-sm flex justify-center">
    <iconify-icon icon="mdi:loading" class="text-4xl animate-spin"></iconify-icon>
  </div>
{/if}
