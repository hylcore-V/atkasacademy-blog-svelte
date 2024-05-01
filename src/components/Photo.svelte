<script lang="ts">
  import type { GalleryPhoto } from "$lib/contentful";
  import { image } from "$lib/utils";
  import type { Entry } from "contentful";

  export let photo: Entry<GalleryPhoto, "WITHOUT_UNRESOLVABLE_LINKS", string>;
</script>

<div
  style:background-image="url({image(photo.fields.image?.fields.file?.url)})"
  class="aspect-square duration-200 w-full bg-cover bg-center bg-neutral-200"
/>
