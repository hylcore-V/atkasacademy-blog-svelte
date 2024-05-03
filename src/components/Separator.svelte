<script lang="ts">
  import { cn } from "$lib/utils";

  let className = "";
  export { className as class };
</script>

<hr class={cn(
  "my-8 duration-200 w-full border-neutral-200 dark:border-neutral-600",
  className
)} />
