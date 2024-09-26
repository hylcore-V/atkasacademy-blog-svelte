<script lang="ts">
  import type { GalleryPhoto } from "$lib/contentful";
  import type { Entry } from "contentful";
  import { Dialog } from "bits-ui";
  import { fade } from "svelte/transition";
  import { clamp, cn } from "$lib/utils";
  import Photo from "$components/Photo.svelte";
  import { onMount } from "svelte";

  const perPage = 20;
  let container: HTMLDivElement;

  let page = 0;
  let loading = false;
  let loadedAll = false;
  let gallery: Entry<GalleryPhoto, "WITHOUT_UNRESOLVABLE_LINKS", string>[] = [];
  let observer: IntersectionObserver;
  let touchStartY: number;

  let selectedIndex: number = -1;
  let selectedPhoto: Entry<GalleryPhoto, "WITHOUT_UNRESOLVABLE_LINKS", string> | null = null;
  let imageElement: HTMLImageElement;

  $: if (selectedIndex !== -1) selectedPhoto = gallery[selectedIndex];

  async function loadPage() {
    if (loading || loadedAll) return;

    loading = true;

    const data = await fetch("/api/gallery.json", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ perPage, page })
    }).then(response => response.json());

    loading = false;

    if (data.length === 0) {
      loadedAll = true;
      return;
    }

    gallery = [...gallery, ...data];
    page++;
    selectedIndex = -1;
  }

  function changePhoto(direction: -1 | 1) {
    selectedIndex = clamp(selectedIndex + direction, 0, gallery.length - 1);
  }

  function keyPress(e: KeyboardEvent) {
    if (e.code === "ArrowRight") changePhoto(1);
    else if (e.code === "ArrowLeft") changePhoto(-1);
  }

  function touchStart(e: TouchEvent) {
    touchStartY = e.touches[0].clientY;
  }

  function touchMove(e: TouchEvent) {
    if (!container) return;

    const diff = e.touches[0].clientY - touchStartY;
    container.style.scale = `${-Math.abs(diff) / 1000 + 1}`;
  }

  function touchEnd(e: TouchEvent) {
    if (e.changedTouches[0].clientY === touchStartY) return;
    selectedPhoto = null;
  }

  onMount(() => {
    const footer = document.getElementById("footer");
    observer = new IntersectionObserver(loadPage, {
      root: null,
      threshold: 0.2,
    });
    if (footer) observer.observe(footer);

    document.addEventListener("touchstart", touchStart);
    document.addEventListener("touchmove", touchMove);
    document.addEventListener("touchend", touchEnd);

    return () => {
      observer.disconnect();
      document.removeEventListener("touchstart", touchStart);
      document.removeEventListener("touchmove", touchMove);
      document.removeEventListener("touchend", touchEnd);
    }
  });
</script>

<!-- Grid of photos -->
<section class="text-neutral grid lg:grid-cols-5 grid-cols-1 gap-xxs">
  {#each gallery as photo, i (photo.fields.slug)}
    <Photo {photo} on:click={() => (selectedIndex = i)} />
  {/each}
</section>

{#if loading}
  <div class="w-full mt-sm flex justify-center">
    <iconify-icon icon="mdi:loading" class="text-4xl animate-spin"></iconify-icon>
  </div>
{/if}

<Dialog.Root
  open={selectedPhoto !== null}
  onOpenChange={() => (selectedIndex = -1)}
>
  <Dialog.Portal>
    <Dialog.Overlay
      transition={fade}
      transitionConfig={{ duration: 150 }}
      class="fixed bg-black/80 z-50 inset-0"
    />

    <Dialog.Content class="fixed z-50 w-full h-full inset-0 text-white pointer-events-none">
      <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
      <div class="relative w-full h-full" on:keydown={keyPress} role="dialog">
        <Dialog.Close class="absolute top-xs right-xs pointer-events-auto size-xs lg:block hidden">
          <iconify-icon icon="mdi:close" class="text-4xl"></iconify-icon>
        </Dialog.Close>

        <div
          class="w-full h-full 2xl:py-md lg:py-sm flex"
          bind:this={container}
        >
          <button
            on:click={() => changePhoto(-1)}
            disabled={!(selectedIndex > 0)}
            class={cn(
            "lg:flex hidden justify-center items-center h-full min-w-sm group pointer-events-auto duration-200",
            selectedIndex > 0 ? "opacity-100" : "opacity-0"
          )}>
            <iconify-icon icon="mdi:chevron-left" class="text-4xl group-hover:scale-125 group-active:scale-100 duration-100"></iconify-icon>
          </button>

          <div class="2xl:px-lg lg:px-md p-xxs w-full h-full flex lg:flex-row flex-col items-center justify-evenly lg:gap-xs gap-xxs">
            <img
              bind:this={imageElement}
              src={selectedPhoto?.fields.image?.fields.file?.url}
              alt={selectedPhoto?.fields.image?.fields.description}
              class="aspect-square lg:h-full lg:w-auto w-full lg:pointer-events-auto pointer-events-none"
            />

            <!-- <div class="lg:h-full flex flex-col lg:gap-sm gap-xxs text-left items-start justify-start"> -->
            <div class="space-y-xxs">
              <div class="pointer-events-auto">
                <h1 class="font-jost uppercase tracking-widest font-semibold text-lg text-pretty">
                  {selectedPhoto?.fields.title}
                </h1>

                <h2 class="italic text-base">
                  <span>{selectedPhoto?.fields.city},</span>
                  <a href="/destinations/{selectedPhoto?.fields.country?.fields.slug}">
                    {selectedPhoto?.fields.country?.fields.short}
                  </a>
                </h2>
              </div>

              <p class="text-sm w-full pointer-events-auto overflow-auto">
                {selectedPhoto?.fields.description}
              </p>
            </div>
          </div>

          {#if selectedIndex < gallery.length}
            <button
              on:click={() => changePhoto(1)}
              disabled={!(selectedIndex < gallery.length - 1)}
              class={cn(
              "lg:flex hidden justify-center items-center h-full min-w-sm group pointer-events-auto duration-200",
              selectedIndex < gallery.length - 1 ? "opacity-100" : "opacity-0"
            )}>
              <iconify-icon icon="mdi:chevron-right" class="text-4xl group-hover:scale-125 group-active:scale-100 duration-100"></iconify-icon>
            </button>
          {/if}
        </div>
      </div>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
