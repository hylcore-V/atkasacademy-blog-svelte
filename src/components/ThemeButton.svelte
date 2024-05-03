<script lang="ts">
  import { onMount } from "svelte";
  import "iconify-icon";
  import { cn } from "$lib/utils";

  export let size: "lg" | "sm" = "sm";

  let darkMode: boolean;

  function switchDarkMode() {
    darkMode = !darkMode;

    localStorage.setItem("theme", darkMode ? "dark" : "light");

    darkMode
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.remove("dark");
  }

  onMount(() => {
    darkMode = document.documentElement.classList.contains("dark");
  });
</script>

<button on:click={switchDarkMode} class="flex">
  <div class={cn(
    "duration-200 text-3xl",
    darkMode ? "rotate-0" : "rotate-45"
  )}>
    {#if darkMode}
      <!-- Sun icon -->
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 21q-3.75 0-6.375-2.625T3 12q0-3.75 2.625-6.375T12 3q.35 0 .688.025t.662.075q-1.025.725-1.638 1.888T11.1 7.5q0 2.25 1.575 3.825T16.5 12.9q1.375 0 2.525-.613T20.9 10.65q.05.325.075.662T21 12q0 3.75-2.625 6.375T12 21Z"/></svg>
    {:else}
      <!-- Moon icon -->
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M12 2a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1ZM2 12a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1Zm17 0a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2h-1a1 1 0 0 1-1-1Zm-6 8a1 1 0 1 0-2 0v1a1 1 0 1 0 2 0v-1Zm5.364-3.05a1 1 0 1 0-1.414 1.414l.707.707a1 1 0 0 0 1.414-1.414l-.707-.707ZM4.929 4.929a1 1 0 0 1 1.414 0l.707.707A1 1 0 0 1 5.636 7.05l-.707-.707a1 1 0 0 1 0-1.414ZM7.05 18.364a1 1 0 1 0-1.414-1.414l-.707.707a1 1 0 1 0 1.414 1.414l.707-.707ZM19.071 4.929a1 1 0 0 1 0 1.414l-.707.707a1 1 0 1 1-1.414-1.414l.707-.707a1 1 0 0 1 1.414 0ZM7 12a5 5 0 1 1 10 0a5 5 0 0 1-10 0Z" clip-rule="evenodd"/></svg>
    {/if}
  </div>
</button>
