<script lang="ts">
  import { cn } from "$lib/utils";

  export let show: boolean;
</script>

<div class={cn(
  "fixed left-1/2 -translate-x-1/2 flex gap-xs bg-white shadow-lg rounded-full px-xs py-3 duration-300",
  show ? "bottom-xs opacity-100" : "-bottom-xs opacity-0"
)}>
  <button class="flex items-center gap-2 font-jost tracking-widest font-semibold text-sm">
    <iconify-icon icon="mdi:heart-outline" class="text-xl"></iconify-icon>
    <p>12</p>
  </button>
  <button class="flex items-center gap-2 font-jost tracking-widest font-semibold text-sm">
    <iconify-icon icon="mdi:comment-outline" class="text-xl"></iconify-icon>
    <p>5</p>
  </button>
</div>
