<script lang="ts">
  import { cn } from "$lib/utils";

  let className = "";
  export { className as class };
</script>

<hr class={cn(
  "my-8 duration-200 w-full",
  className
)} />
