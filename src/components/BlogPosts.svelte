<script lang="ts">
  import type { BlogPost } from "$lib/contentful";
  import { clamp, image } from "$lib/utils";
  import type { Entry } from "contentful";
  import "iconify-icon";
  import { onMount } from "svelte";

  import Pagination from "$components/Pagination.svelte";
	import Search from "$components/Search.svelte";

  export let page: number;
  export let query: string;

  const perPage = 12;

  let loading = true;
  let allPosts: Entry<BlogPost, "WITHOUT_UNRESOLVABLE_LINKS", string>[] = [];
  let posts: Entry<BlogPost, "WITHOUT_UNRESOLVABLE_LINKS", string>[] = [];

  function search(query: string) {
    if (!query) return;
    const q = encodeURIComponent(query);
    window.location.href = `/blog?page=1&q=${q}`;
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

<Search {search} {query} />

<!-- Grid of posts -->
<section class="text-neutral dark:text-white grid lg:grid-cols-4 grid-cols-1 gap-xxs">
  {#each posts as item}
    <a
      href={`/posts/${item.fields.slug}`}
      class="group space-y-[0.5rem]"
    >
      <div
        style:background-image="url({image(item.fields.cover?.fields.file?.url)})"
        class="h-40 bg-cover bg-center group-hover:brightness-75 duration-200"
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
