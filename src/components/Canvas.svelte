<script lang="ts">
  import { Canvas, HierarchicalObject } from "@threlte/core";
  import Scene from "$components/Scene.svelte";
  import { onMount } from "svelte";

  let width = 0
  let height = 0

  onMount(() => {
    width = window.innerWidth;
    height = window.innerHeight;
  });
</script>

<Canvas size={{ width, height }}>
  <Scene />
</Canvas>
