<script lang="ts">
  import { cn, extractSpotifyId } from "$lib/utils";
  import { onMount } from "svelte";
  import { Collapsible } from "bits-ui";
  import "iconify-icon";
  import { slide } from "svelte/transition";
	import Separator from "$components/Separator.svelte";
  import {
    type ImageType,
    layouts,
    longAspect,
    landscapeAspect,
    portraitAspect
  } from "$lib/imageLayouts";

  export let content: string;
  export let podcast: string;

  let contentContainer: HTMLElement;
  let headings: NodeListOf<HTMLHeadingElement>;
  let imageGroup: HTMLImageElement[][] = [];
  let isOutlineOpen = false;
  let imagesLoaded: number[];

  function scrollToSection(id: string) {
    const target = document.getElementById(id) as HTMLHeadingElement;
    window.scrollTo(0, target.offsetTop - 100);
  }

  function layoutImages(groupIndex: number) {
    console.log("Layout images", groupIndex);
    const group = imageGroup[groupIndex];
    const imageTypes: ImageType[] = group.map(
      image => image.naturalWidth > image.naturalHeight ? "landscape" : "portrait"
    );

    // Getting the correct image layout based on how many images and orientation
    const layoutSize = layouts[group.length];
    const layout = layoutSize.find(layout => layout.order.toString() === imageTypes.toString());

    // Set properties for CSS grid
    layout?.grid.forEach((item, i) => {
      group[i].style.gridRow = `${item.rowStart} / ${item.rowEnd}`;
      group[i].style.gridColumn = `${item.colStart} / ${item.colEnd}`;
    });

    const wrapper = document.createElement("div");
    wrapper.style.display = "grid";
    wrapper.style.gap = "0.5rem";

    // Adding the images in the group to a wrapper grid
    group[0].parentNode?.insertBefore(wrapper, group[0]);
    group.forEach((image, i) => {
      if (layout?.grid[i].colEnd === 3) {
        image.style.aspectRatio = longAspect;
      } else if (image.naturalWidth >= image.naturalHeight) {
        image.style.aspectRatio = landscapeAspect;
      } else {
        image.style.aspectRatio = portraitAspect;
      }

      wrapper.appendChild(image);
    });
  }

  onMount(() => {
    headings = contentContainer.querySelectorAll("h1");

    if (headings) {
      headings.forEach((heading, i) => {
        heading.id = i.toString();
      });
    }

    let tempImages: HTMLImageElement[] = [];
    const images = Array.from(contentContainer.querySelectorAll("img"));

    // Grouping images that are next to each other
    imagesLoaded = Array(images.length).fill(0);
    images.forEach(image => {
      tempImages.push(image);

      if (image.nextElementSibling?.tagName !== "IMG") {
        imageGroup.push([...tempImages]);
        tempImages = [];
      }
    });

    imageGroup.forEach((group, i) => {
      group.forEach(image => {
        image.onload = () => {
          console.log("Image loaded", image.src, i);
          imagesLoaded[i]++;
          if (imagesLoaded[i] === group.length) {
            layoutImages(i);
          }
        };

        image.src = image.getAttribute("data-src") || "https://picsum.photos/200/300";
      });
    });
  });
</script>

<section class="lg:mx-xl xl:mx-xxl space-y-8">
  {#if headings && headings.length !== 0}
    <Collapsible.Root class="w-full bg-neutral dark:bg-neutral-600 text-white rounde-md" bind:open={isOutlineOpen}>
      <Collapsible.Trigger class="flex justify-between w-full p-xxs">
        <h3 class="font-jost font-semibold tracking-widest uppercase">
          Table of Contents
        </h3>
        <iconify-icon icon="mdi:chevron-down" class={cn(
          "text-2xl duration-200",
          isOutlineOpen ? "rotate-0" : "rotate-180"
        )}></iconify-icon>
      </Collapsible.Trigger>

      <Collapsible.Content transition={slide} class="bg-neutral-100 dark:bg-neutral-600 text-neutral dark:text-white py-2 rounde-b-md">
        {#each headings as heading, i}
          <button
            on:click={() => scrollToSection(i.toString())}
            class="text-sm font-semibold py-2 px-xxs w-full text-left flex items-center group"
          >
            <span>{heading.innerText}</span>
            <iconify-icon
              icon="mdi:chevron-right"
              class="text-2xl duration-200 opacity-0 translate-x-0 group-hover:opacity-100 group-hover:translate-x-2"
            ></iconify-icon>
          </button>
        {/each}
      </Collapsible.Content>
    </Collapsible.Root>

    <Separator />
  {/if}

  {#if podcast.length > 0}
    <div class="p-xxs bg-neutral dark:bg-neutral-600 text-white font-semibold uppercase font-jost tracking-widest space-y-xxs rounde-md">
      <h3>Listen to this episode</h3>
      <iframe
        title="Spotify Player Embed"
        src={`https://open.spotify.com/embed/episode/${extractSpotifyId(podcast)}?utm_source=generator&theme=0`}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        class="w-full h-20"
      ></iframe>
    </div>
  {/if}

  <article
    bind:this={contentContainer}
    class="prose prose-neutral max-w-none prose-img:my-0 prose-h1:mt-sm prose-h1:font-jost prose-p:text-neutral dark:prose-p:text-white prose-headings:text-neutral dark:prose-headings:text-white"
  >
    {@html content}
  </article>
</section>
