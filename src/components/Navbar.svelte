<script lang="ts">
  import { onMount } from "svelte";
  import { cn } from "../lib/utils";

  let isPageTop = true;
  let isPageBottom = false;
  let scrollDirection: "up" | "down" = "up";
  let isScrolledScreen = false;

  function checkPageTop() {
    isPageTop = window.scrollY === 0;
    isPageBottom = Math.ceil(
      window.innerHeight + window.scrollY
    ) >= document.body.offsetHeight;
    isScrolledScreen = window.scrollY > window.innerHeight;
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
    "text-neutral bg-white dark:bg-neutral dark:text-white h-nav shadow-lg": !isPageTop,
  }
)}>

</nav>
