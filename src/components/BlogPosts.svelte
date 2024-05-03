<script lang="ts">
  import type { BlogPost } from "$lib/contentful";
  import { image } from "$lib/utils";
  import type { Entry } from "contentful";
  import "iconify-icon";
  import { onMount } from "svelte";
    import { fade } from "svelte/transition";

  const perPage = 20;

  let page = 0;
  let loading = true;
  let posts: Entry<BlogPost, "WITHOUT_UNRESOLVABLE_LINKS", string>[] = [];

  async function loadPage() {
    loading = true;
    const data = await fetch("/api/posts.json", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ perPage, page })
    }).then(response => response.json());
    loading = false;

    posts = [...posts, ...data];
    page++;
  }

  onMount(loadPage);
</script>

<!-- Grid of posts -->
<section class="text-neutral dark:text-white grid grid-cols-4 gap-xxs">
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

{#if loading}
  <div class="w-full mt-sm flex justify-center" transition:fade>
    <iconify-icon icon="mdi:loading" class="text-4xl animate-spin"></iconify-icon>
  </div>
{/if}

<button on:click={loadPage}>
  Load
</button>
