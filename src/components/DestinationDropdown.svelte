<script lang="ts">
  const destinations = [
    { name: "美國 USA", url: "/destinations/usa" },
    { name: "法國 France", url: "/destinations/france" },
    { name: "義大利 Italy", url: "/destinations/italy" },
    { name: "日本 Japan", url: "/destinations/japan" },
    { name: "台灣 Taiwan", url: "/destinations/taiwan" },
    { name: "泰國 Thailand", url: "/destinations/thailand" },
    { name: "土耳其 Türkiye", url: "/destinations/turkey" },
    { name: "葡萄牙 Portugal", url: "/destinations/portugal" },
    { name: "黑山共和國 Montenegro", url: "/destinations/montenegro" },
  ];
</script>

<div class="h-full flex items-center relative group">
  <a href="/destinations">Destinations</a>

  <!-- Dropdown -->
  <div class="w-lg flex flex-col absolute bg-white dark:bg-neutral text-neutral dark:text-white p-4 group-hover:opacity-100 opacity-0 duration-150 top-[4.5rem] left-0 shadow-lg font-jost uppercase font-semibold tracking-widest group-hover:pointer-events-auto pointer-events-none">
    {#each destinations as destination}
      <a
        href={destination.url}
        class="hover:bg-neutral-100 hover:text-black dark:hover:bg-neutral-600 dark:hover:text-white p-2 duration-150"
      >
        {destination.name}
      </a>
    {/each}
    <a
      href="/destinations"
      class="hover:bg-neutral-100 hover:text-black dark:hover:bg-neutral-600 dark:hover:text-white p-2 duration-150 flex items-center gap-2"
    >
      <iconify-icon icon="mdi:plus-circle-outline" class="text-xl"></iconify-icon>
      <span>更多 MORE PLACES</span>
    </a>
  </div>
</div>
