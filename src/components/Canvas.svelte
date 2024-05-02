<script lang="ts">
  import { Canvas } from "@threlte/core";
  import Scene from "$components/Scene.svelte";
  import { onMount } from "svelte";
  import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
  import gsap from "gsap";

  let st: ScrollTrigger;

  onMount(() => {
    gsap.registerPlugin(ScrollTrigger);

    st = ScrollTrigger.create({
      trigger: "#earthCanvas",
      scrub: true,
      pin: true,
      start: "top top",
      end: "+=100%",
    });
  });
</script>

<section class="w-full bg-black" id="earthCanvas">
  <div class="absolute bottom-0 w-full h-sm bg-gradient-to-t from-black" />

  <Canvas>
    <Scene {st} />
  </Canvas>
</section>

