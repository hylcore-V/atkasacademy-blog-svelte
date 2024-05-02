<script lang="ts">
  import { T, useTask } from "@threlte/core";
  import { interactivity } from "@threlte/extras";
  import { spring } from "svelte/motion";

  import Earth from "$components/Earth.svelte";

  interactivity();
  const scale = spring(1);
  const spinSpeed = 0.5;

  let rotation = 0;
  useTask(delta => rotation += spinSpeed * delta);
</script>

<T.PerspectiveCamera
  makeDefault
  position={[0, 0, 1600]}
  zoom={1}
  on:create={({ ref }) => ref.lookAt(0, 0, 0)}
/>

<T.DirectionalLight position={[0, 0, 10]} intensity={5} />

<Earth
  rotation.y={rotation}
  scale={$scale}
  on:pointerenter={() => scale.set(1.2)}
  on:pointerleave={() => scale.set(1)}
/>
