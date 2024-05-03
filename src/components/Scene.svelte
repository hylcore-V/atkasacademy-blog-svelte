<script lang="ts">
  import { T, useTask } from "@threlte/core";
  import { interactivity } from "@threlte/extras";
  import { spring } from "svelte/motion";
  import type ScrollTrigger from "gsap/dist/ScrollTrigger";
  import { degToRad } from "three/src/math/MathUtils.js";

  import Earth from "$components/Earth.svelte";

  interactivity();

  const rotation = spring(0);
  const STARS_COUNT = 350;

  export let st: ScrollTrigger;

  let stars = [];

  useTask(() => {
    rotation.set(degToRad(st.progress * 360));
  });
</script>

<T.PerspectiveCamera
  makeDefault
  position={[0, 0, 1600]}
  zoom={1}
  on:create={({ ref }) => ref.lookAt(0, 0, 0)}
/>

<T.AmbientLight intensity={10} />

<Earth
  rotation.y={$rotation}
  scale={1}
/>
