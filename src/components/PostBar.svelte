<script lang="ts">
  import { cn } from "$lib/utils";

  export let show: boolean;

  function scrollToComments() {
    const target = document.getElementById("comments") as HTMLHeadingElement;
    window.scrollTo(0, target.offsetTop - 100);
  }
</script>

<div class={cn(
  "fixed left-1/2 -translate-x-1/2 flex gap-xs bg-white dark:bg-neutral-600 shadow-lg rounded-full px-[1.5rem] py-3 duration-300 font-medium text-sm font-jost tracking-widest",
  show ? "bottom-[1.5rem] opacity-100" : "-bottom-xs opacity-0"
)}>
  <button class="flex items-center gap-2">
    <iconify-icon icon="mdi:heart-outline" class="text-xl"></iconify-icon>
    <p>12</p>
  </button>
  <button class="flex items-center gap-2" on:click={scrollToComments}>
    <iconify-icon icon="mdi:comment-outline" class="text-xl"></iconify-icon>
    <p>5</p>
  </button>
</div>
