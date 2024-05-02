<script lang="ts">
  import { T, useTask } from "@threlte/core";
  import { interactivity } from "@threlte/extras";
  import { spring } from "svelte/motion";
  import type ScrollTrigger from "gsap/dist/ScrollTrigger";
  import { degToRad } from "three/src/math/MathUtils.js";

  import Earth from "$components/Earth.svelte";

  interactivity();
  const scale = spring(1);

  export let st: ScrollTrigger;

  const rotation = spring(0);

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

<T.AmbientLight intensity={5} />

<Earth
  rotation.y={$rotation}
  scale={$scale}
  on:pointerenter={() => scale.set(1.1)}
  on:pointerleave={() => scale.set(1)}
/>
