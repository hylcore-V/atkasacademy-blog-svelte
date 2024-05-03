<script lang="ts">
  import "iconify-icon";
  import Separator from "./Separator.svelte";
</script>

<!-- Wavy footer -->
<div class="bg-waves dark:bg-dark-waves bg-white dark:bg-neutral bg-cover bg-[center_bottom] bg-no-repeat w-full h-32 -my-0.5 duration-200"></div>

<footer class="bg-footer dark:bg-dark-footer py-xs px-sm flex flex-col items-center duration-200">
  <section class="w-full flex justify-between items-center">
    <!-- Podcast links -->
    <div class="space-y-2">
      <a href="https://open.spotify.com/show/7xuJTB7kCfKB0JVBkgW4k3"
        class="rounded-md flex gap-2 items-center w-64 px-3 h-14 bg-neutral text-white"
        target="_blank">
        <iconify-icon icon="mdi:spotify" class="text-3xl text-spotify"></iconify-icon>
        <div>
          <small class="uppercase tracking-widest text-[0.65rem]">Listen on</small>
          <h1 class="font-bold text-lg tracking-wider -mt-2">Spotify</h1>
        </div>
      </a>

      <a href="https://podcasts.apple.com/us/podcast/世界是學校-worldschooling/id1646258789"
        class="rounded-md flex gap-3 items-center w-64 px-[14px] h-14 bg-neutral text-white"
        target="_blank">
        <iconify-icon icon="fa-solid:podcast" class="text-3xl text-apple-podcasts"></iconify-icon>
        <div>
          <small class="uppercase tracking-widest text-[0.65rem]">Listen on</small>
          <h1 class="font-bold text-lg tracking-wider -mt-2">Apple Podcasts</h1>
        </div>
      </a>
    </div>

    <!-- Website links -->
    <div class="text-right space-x-sm">
      <div class="inline-block space-y-1">
        <h1 class="uppercase tracking-widest font-jost font-semibold text-sm">Pages</h1>
        <br>
        <a class="block text-sm" href="/">Home</a>
        <a class="block text-sm" href="/destinations">Destinations</a>
        <a class="block text-sm" href="/blog">Blog</a>
        <a class="block text-sm" href="/about">About Us</a>
      </div>

      <div class="inline-block space-y-1">
        <h1 class="uppercase tracking-widest font-jost font-semibold text-sm">Top Destinations</h1>
        <br>
        <a class="block text-sm" href="/destinations/italy">Italy</a>
        <a class="block text-sm" href="/destinations/japan">Japan</a>
        <a class="block text-sm" href="/destinations/montenegro">Montenegro</a>
        <a class="block text-sm" href="/destinations/france">France</a>
      </div>
    </div>
  </section>

  <Separator />

  <section class="w-full flex items-center justify-between">
    <p>© 2023 Atlas Academy. All rights reserved.</p>

    <div class="space-x-1">
      <a href="https://www.facebook.com/worldschool.atlas.academy">
        <iconify-icon icon="mdi:facebook" class="text-2xl inline-block"></iconify-icon>
      </a>
      <a href="https://open.spotify.com/show/7xuJTB7kCfKB0JVBkgW4k3">
        <iconify-icon icon="mdi:spotify" class="text-2xl inline-block"></iconify-icon>
      </a>
      <a href="https://podcasts.apple.com/us/podcast/%E4%B8%96%E7%95%8C%E6%98%AF%E5%AD%B8%E6%A0%A1-worldschooling/id1646258789">
        <iconify-icon icon="fa-solid:podcast" class="text-2xl inline-block"></iconify-icon>
      </a>
    </div>
  </section>
</footer>

<section class="bg-neutral flex justify-center items-center text-white font-mono text-xs h-5">
  <p>Made by <span class="italic">Leo</span> with</p>

  <a href="https://astro.build" target="_blank" class="mx-1 flex items-center">
    <iconify-icon icon="devicon-plain:astro" class="text-sm"></iconify-icon>
  </a>
  <span>&</span>
  <a href="https://svelte.dev" target="_blank" class="mx-1 flex items-center">
    <iconify-icon icon="devicon-plain:svelte" class="text-sm"></iconify-icon>
  </a>
</section>
