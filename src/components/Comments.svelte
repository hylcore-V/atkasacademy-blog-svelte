<script lang="ts">
  import { Label } from "bits-ui";
  import { onMount } from "svelte";
  import "iconify-icon";

  export let slug: string;

  function createComment() {

  }

  async function loadComments() {
    const comments = await fetch("/api/data.json", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }).then(response => response.json());

    console.log(comments);
  }

  onMount(loadComments);
</script>

<section class="mb-xs" id="comments">
  <form
    class="w-full space-y-xs"
    on:submit|preventDefault={createComment}
  >
    <div class="space-y-xxs">
      <Label.Root for="body" class="uppercase tracking-widest font-semibold text-sm font-jost">
        Add Comment*
      </Label.Root>
      <textarea
        name="Add Comment"
        class="block w-full outline-none p-2 bg-neutral-100 text-neutral"
        id="body"
        rows={5}
        required
      />
    </div>

    <div class="space-y-xxs">
      <Label.Root for="author" class="uppercase tracking-widest font-semibold text-sm font-jost">
        Your Name*
      </Label.Root>
      <input
        type="text"
        class="block w-full outline-none p-2 bg-neutral-100 text-neutral"
        id="author"
        required
      />
    </div>

    <input
      type="submit"
      value="Post Comment"
      class="uppercase tracking-widest font-jost font-semibold bg-neutral dark:bg-neutral-100 p-xxs px-xs text-sm text-white dark:text-neutral cursor-pointer"
    />
  </form>
</section>
