<script lang="ts">
  import type { BlogPost } from "$lib/contentful";
  import type { Entry } from "contentful";
  import { image } from "$lib/utils";
  import "iconify-icon";
  import Pagination from "$components/Pagination.svelte";

  export let posts: Entry<BlogPost, "WITHOUT_UNRESOLVABLE_LINKS", string>[];
  export let perPage: number;
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
      <h3 class="font-[500]">{item.fields.title}</h3>
    </a>
  {/each}
</section>

<Pagination {perPage} {totalPosts} {currPage} {onPageChange} />
