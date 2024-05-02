<script lang="ts">
  import type { GalleryPhoto } from "$lib/contentful";
  import { image } from "$lib/utils";
  import type { Entry } from "contentful";

  export let photo: Entry<GalleryPhoto, "WITHOUT_UNRESOLVABLE_LINKS", string>;
</script>

<button class="group relative" on:click>
  <div
    style:background-image="url({image(photo.fields.image?.fields.file?.url)})"
    class="aspect-square duration-200 w-full bg-cover bg-center bg-neutral-100 group-hover:brightness-50"
  />

  <div class="w-4/5 absolute left-1/2 -translate-x-1/2 group-hover:-translate-y-1/2 group-hover:opacity-100 opacity-0 duration-200 top-1/2 text-white">
    <h1 class="text-md uppercase font-jost font-semibold tracking-widest">{photo.fields.title}</h1>
    <small class="text-sm italic relative top-4">{photo.fields.city}</small>
  </div>
</button>
