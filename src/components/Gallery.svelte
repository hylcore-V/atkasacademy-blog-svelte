<script lang="ts">
  import type { GalleryPhoto } from "$lib/contentful";
  import type { Entry } from "contentful";
  import Pagination from "$components/Pagination.svelte";
  import Photo from "$components/Photo.svelte";
  import { Dialog } from "bits-ui";
  import { fade } from "svelte/transition";
  import { clamp, cn } from "$lib/utils";

  export let perPage: number;
  export let gallery: Entry<GalleryPhoto, "WITHOUT_UNRESOLVABLE_LINKS", string>[];
  export let totalPosts: number;
  export let currPage: number;

  let selectedIndex: number = -1;
  let selectedPhoto: Entry<GalleryPhoto, "WITHOUT_UNRESOLVABLE_LINKS", string> | null = null;
  let imageElement: HTMLImageElement;

  $: if (selectedIndex !== -1) selectedPhoto = gallery[selectedIndex];

  function onPageChange(page: number) {
    window.location.href = `/gallery/${page != 1 ? page : ""}`;
  }

  function changePhoto(direction: -1 | 1) {
    selectedIndex = clamp(selectedIndex + direction, 0, gallery.length - 1);
  }
</script>

<!-- Grid of photos -->
<section class="text-neutral grid grid-cols-5 gap-xxs">
  {#each gallery as photo, i (photo.fields.slug)}
    <Photo {photo} on:click={() => (selectedIndex = i)} />
  {/each}
</section>

<Pagination {perPage} {totalPosts} {currPage} {onPageChange} />

<Dialog.Root open={selectedPhoto !== null}>
  <Dialog.Portal>
    <Dialog.Overlay
      transition={fade}
      transitionConfig={{ duration: 150 }}
      class="fixed bg-black/80 z-50 inset-0"
    />

    <Dialog.Content class="fixed z-50 w-full h-full inset-0 text-white pointer-events-none">
      <div class="relative w-full h-full">
        <Dialog.Close class="absolute top-xs right-xs pointer-events-auto size-xs">
          <iconify-icon icon="mdi:close" class="text-4xl"></iconify-icon>
        </Dialog.Close>

        <div class="h-full flex items-center justify-center">
          <div class="flex w-full h-4/5 items-center justify-between gap-xs">
            <button
              on:click={() => changePhoto(-1)}
              disabled={!(selectedIndex > 0)}
              class={cn(
              "flex justify-center items-center h-full min-w-sm group pointer-events-auto duration-200",
              selectedIndex > 0 ? "opacity-100" : "opacity-0"
            )}>
              <iconify-icon icon="mdi:chevron-left" class="text-4xl group-hover:scale-125 group-active:scale-100 duration-100"></iconify-icon>
            </button>

            <img
              bind:this={imageElement}
              src={selectedPhoto?.fields.image?.fields.file?.url}
              alt={selectedPhoto?.fields.image?.fields.description}
              class="aspect-square h-full pointer-events-auto"
            />

            <div class="h-full flex flex-col gap-sm text-left items-start justify-start flex-grow">
              <div class="pointer-events-auto">
                <h1 class="font-jost uppercase tracking-widest font-semibold text-xl">
                  {selectedPhoto?.fields.title}
                </h1>
                <h2 class="italic text-base">
                  <span>{selectedPhoto?.fields.city},</span>
                  <a href="/destinations/{selectedPhoto?.fields.country?.fields.slug}">
                    {selectedPhoto?.fields.country?.fields.short}
                  </a>
                </h2>
              </div>

              <p class="text-base min-w-full pointer-events-auto">
                {selectedPhoto?.fields.description}
              </p>
            </div>

            {#if selectedIndex < gallery.length}
              <button
                on:click={() => changePhoto(1)}
                disabled={!(selectedIndex < gallery.length - 1)}
                class={cn(
                "flex justify-center items-center h-full min-w-sm group pointer-events-auto duration-200",
                selectedIndex < gallery.length - 1 ? "opacity-100" : "opacity-0"
              )}>
                <iconify-icon icon="mdi:chevron-right" class="text-4xl group-hover:scale-125 group-active:scale-100 duration-100"></iconify-icon>
              </button>
            {/if}
          </div>
        </div>
      </div>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
