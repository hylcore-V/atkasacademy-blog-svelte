<script lang="ts">
  import { extractSpotifyId } from "$lib/utils";
  import { afterUpdate, onMount } from "svelte";
  import { type ImageType, layouts, longAspect, landscapeAspect, portraitAspect } from "$lib/imageLayouts";

  export let content: string;
  export let podcast: string;

  let contentContainer: HTMLElement;
  let headings: NodeListOf<HTMLHeadingElement>;
  let imageGroup: HTMLImageElement[][] = [];

  function scrollToSection(id: string) {
    const target = document.getElementById(id) as HTMLHeadingElement;
    window.scrollTo(0, target.offsetTop - 100);
  }

  onMount(() => {
    window.onload = () => {
      console.log("Content loaded");

      let tempImages: HTMLImageElement[] = [];
      const images = Array.from(contentContainer.querySelectorAll("img"));

      images.forEach(image => {
        tempImages.push(image);

        if (image.nextElementSibling?.tagName !== "IMG") {
          imageGroup.push([...tempImages]);
          tempImages = [];
        }
      });

      imageGroup.forEach((group, i) => {
        const imageTypes: ImageType[] = group.map(
          image => image.naturalWidth > image.naturalHeight ? "landscape" : "portrait"
        );

        const layoutSize = layouts[group.length];
        const layout = layoutSize.find(layout =>
          layout.order.toString() === imageTypes.toString()
        );

        if (layout) {
          layout.grid.forEach((item, i) => {
            group[i].style.gridRow = `${item.rowStart} / ${item.rowEnd}`;
            group[i].style.gridColumn = `${item.colStart} / ${item.colEnd}`;
          });
        }

        const wrapper = document.createElement("div");
        wrapper.style.display = "grid";
        wrapper.style.gap = "0.5rem";

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
      });
    }
  });

  onMount(() => {
    headings = contentContainer.querySelectorAll("h1");

    if (headings) {
      headings.forEach((heading, i) => {
        heading.id = i.toString();
      });
    }
  });
</script>

<section class="lg:mx-lg lg:my-sm space-y-8">
  {#if podcast.length > 0}
    <iframe
      title="Spotify Player Embed"
      src={`https://open.spotify.com/embed/episode/${extractSpotifyId(podcast)}?utm_source=generator&theme=0`}
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
      class="w-full h-20"></iframe>
  {/if}

  <article
    bind:this={contentContainer}
    class="prose prose-neutral max-w-none prose-img:my-0 prose-h1:mt-sm prose-h1:font-jost"
  >
    {@html content}
  </article>
</section>
