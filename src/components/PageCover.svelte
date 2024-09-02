<script lang="ts">
  export let src = "/covers/home.webp";
</script>

<div
  class="h-screen w-screen bg-cover bg-center flex lg:bg-fixed justify-center text-center text-white dim-image"
  style:background-image="url('{src}')"
>
  <div class="absolute bottom-44">
    <slot />
  </div>
</div>
