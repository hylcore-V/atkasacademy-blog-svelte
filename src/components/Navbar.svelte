<script lang="ts">
  import { onMount } from "svelte";
  import { cn } from "$lib/utils";
  import { fade, fly } from "svelte/transition";
  import "iconify-icon";

  import ThemeButton from "$components/ThemeButton.svelte";
  import PostBar from "$components/PostBar.svelte";
  import DestinationDropdown from "$components/DestinationDropdown.svelte";

  export let isPost: boolean;
  export let isHome: boolean;

  let isPageTop = true;
  let isPageBottom = false;
  let scrollDirection: "up" | "down" = "up";
  let isScrolledScreen = false;
  let isScrolledContent = false;
  let navigationDropdown = false;

  function checkPageTop() {
    isPageTop = window.scrollY === 0;
    isPageBottom = Math.ceil(window.innerHeight + window.scrollY) >= document.body.offsetHeight;
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
  "flex justify-between items-center fixed w-full z-30 px-xs duration-500",
  isScrolledScreen && scrollDirection === "down" ? "-top-[7rem]" : "top-0",
  {
    "text-white bg-transparent h-big-nav": isPageTop,
    "text-neutral dark:text-white bg-white dark:bg-neutral h-nav shadow-lg": !isPageTop,
  }
)}>
  <header class={cn(
    "font-zhanku duration-100",
    isPageTop ? "text-3xl" : "text-2xl"
  )}>
    <a class="duration-150" href="/">世界是学校</a>
  </header>

  <!-- Navigation -->
  <div class="font-jost font-semibold uppercase tracking-widest text-xs gap-8 items-center duration-200 h-full lg:flex hidden">
    <a href="/">Home</a>
    <DestinationDropdown />
    <a href="/blog?page=1">Blog</a>
    <a href="/gallery">Gallery</a>
    <a href="/about">About</a>

    <ThemeButton />
  </div>

  <!-- Socials -->
  <div class="space-x-2 lg:block hidden">
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

  <!-- Mobile hamburger button -->
  <button
    on:click={() => (navigationDropdown = !navigationDropdown)}
    class={cn("flex lg:hidden text-[26px] justify-center items-center duration-150", { "rotate-90": navigationDropdown })}
  >
    {#if navigationDropdown}
      <iconify-icon icon="mdi:close"></iconify-icon>
    {:else}
      <iconify-icon icon="mdi:menu"></iconify-icon>
    {/if}
  </button>
</nav>

<!-- Mobile navigation dropdown -->
{#if navigationDropdown}
  <div
    class="h-screen w-full fixed top-0 left-0 dark:bg-neutral bg-white z-20 flex flex-col justify-center items-center gap-sm"
    transition:fade={{ duration: 150 }}
  >
    <ThemeButton />

    <div class="flex flex-col items-center gap-4 font-semibold tracking-widest uppercase font-jost text-xl">
      <a href="/">Home</a>
      <a href="/destinations">Destinations</a>
      <a href="/blog?page=1">Blog</a>
      <a href="/gallery">Gallery</a>
      <a href="/about">About</a>
    </div>

    <div class="flex gap-6 text-2xl">
      <a
        href="https://www.facebook.com/worldschool.atlas.academy"
        target="_blank"
      >
        <iconify-icon icon="mdi:facebook" class="duration-150"></iconify-icon>
      </a>

      <a
        href="https://open.spotify.com/show/7xuJTB7kCfKB0JVBkgW4k3"
        target="_blank"
      >
        <iconify-icon icon="mdi:spotify" class="duration-150"></iconify-icon>
      </a>

      <a
        href="https://podcasts.apple.com/us/podcast/%E4%B8%96%E7%95%8C%E6%98%AF%E5%AD%B8%E6%A0%A1-worldschooling/id1646258789"
        target="_blank"
      >
        <iconify-icon icon="fa:podcast" class="duration-150"></iconify-icon>
      </a>
    </div>
  </div>
{/if}

<!-- Back to top button -->
{#if !isPageTop && !isPageBottom && !isHome}
  <button
    class="fixed bottom-8 right-8 text-2xl text-white rounded-full shadow-lg bg-neutral dark:bg-neutral-600 w-12 h-12 flex justify-center items-center z-10"
    on:click={scrollToTop}
    transition:fly={{ y: 80, duration: 300 }}>
    <iconify-icon icon="mdi:chevron-up"></iconify-icon>
  </button>
{/if}

<!-- Liking and comments bar on posts only -->
{#if isPost}
  <PostBar show={isScrolledScreen && scrollDirection === "down" && !isScrolledContent} />
{/if}
