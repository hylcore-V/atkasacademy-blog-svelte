<script lang="ts">
  import { onMount } from "svelte";
  import { cn } from "$lib/utils";
  import { fly } from "svelte/transition";
  import "iconify-icon";

  import ThemeButton from "$components/ThemeButton.svelte";
  import PostBar from "$components/PostBar.svelte";

  export let isPost: boolean;

  let isPageTop = true;
  let isPageBottom = false;
  let scrollDirection: "up" | "down" = "up";
  let isScrolledScreen = false;
  let isScrolledContent = false;

  function checkPageTop() {
    isPageTop = window.scrollY === 0;
    isPageBottom = Math.ceil(
      window.innerHeight + window.scrollY
    ) >= document.body.offsetHeight;
    isScrolledScreen = window.scrollY > window.innerHeight;
    isScrolledContent = window.scrollY > document.body.offsetHeight - 1000;
  }

  function checkScrollDirection(e: WheelEvent) {
    scrollDirection = e.deltaY < 0 ? "up" : "down";
  }

  function scrollToTop() {
    window.scrollTo(0, 0);
  }

  onMount(() => {
    checkPageTop();

    document.addEventListener("scroll", checkPageTop);
    document.addEventListener("wheel", checkScrollDirection);

    return () => {
      document.removeEventListener("scroll", checkPageTop);
      document.removeEventListener("wheel", checkScrollDirection);
    }
  });
</script>

<nav class={cn(
  "flex justify-between items-center fixed w-full z-50 px-xs duration-500",
  isScrolledScreen && scrollDirection === "down" ? "-top-[7rem]" : "top-0",
  {
    "text-white bg-transparent h-big-nav": isPageTop,
    "text-neutral bg-white h-nav shadow-lg": !isPageTop,
  }
)}>
  <header class={cn(
    "font-zhanku duration-100",
    isPageTop ? "text-3xl" : "text-2xl"
  )}>
    <a class="duration-150" href="/">世界是学校</a>
  </header>

  <!-- Navigation -->
  <div class="font-jost font-semibold uppercase tracking-widest text-xs gap-8 items-center duration-200 h-full flex">
    <a href="/">Home</a>
    <a href="/destinations">Destinations</a>
    <a href="/blog">Blog</a>
    <a href="/gallery">Gallery</a>
    <a href="/about">About</a>

    <ThemeButton />
  </div>

  <!-- Socials -->
  <div class="space-x-2">
    <a
      href="https://www.facebook.com/worldschool.atlas.academy"
      target="_blank"
    >
      <iconify-icon icon="mdi:facebook" class="text-xl duration-150"></iconify-icon>
    </a>

    <a
      href="https://open.spotify.com/show/7xuJTB7kCfKB0JVBkgW4k3"
      target="_blank"
    >
      <iconify-icon icon="mdi:spotify" class="text-xl duration-150"></iconify-icon>
    </a>

    <a
      href="https://podcasts.apple.com/us/podcast/%E4%B8%96%E7%95%8C%E6%98%AF%E5%AD%B8%E6%A0%A1-worldschooling/id1646258789"
      target="_blank"
    >
      <iconify-icon icon="fa:podcast" class="text-xl duration-150"></iconify-icon>
    </a>
  </div>
</nav>

<!-- Back to top button -->
{#if !isPageTop && !isPageBottom}
  <button
    class="fixed bottom-8 right-8 text-2xl text-white rounded-full shadow-lg bg-neutral w-12 h-12 flex justify-center items-center z-50"
    on:click={scrollToTop}
    transition:fly={{ y: 80, duration: 300 }}>
    <iconify-icon icon="mdi:chevron-up"></iconify-icon>
  </button>
{/if}

<!-- Liking and comments bar on posts only -->
{#if isPost}
  <PostBar show={isScrolledScreen && scrollDirection === "down" && !isScrolledContent} />
{/if}
