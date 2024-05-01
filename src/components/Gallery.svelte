<script lang="ts">
  import type { GalleryPhoto } from "$lib/contentful";
  import type { Entry } from "contentful";
  import Pagination from "$components/Pagination.svelte";
  import { image } from "$lib/utils";

  export let perPage: number;
  export let gallery: Entry<GalleryPhoto, "WITHOUT_UNRESOLVABLE_LINKS", string>[];
  export let totalPosts: number;
  export let currPage: number;

  function onPageChange(page: number) {
    window.location.href = `/gallery/${page != 1 ? page : ""}`;
  }
</script>

<!-- Grid of photos -->
<section class="text-neutral grid grid-cols-5 gap-1">
  {#each gallery as photo}
    <img
      src={image(photo.fields.image?.fields.file?.url)}
      alt={photo.fields.image?.fields.description}
      class="aspect-square duration-200"
    />
  {/each}
</section>

<Pagination {perPage} {totalPosts} {currPage} {onPageChange} />
