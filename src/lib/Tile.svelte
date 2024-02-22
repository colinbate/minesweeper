<script lang="ts">
	import type { MouseEventHandler } from "svelte/elements";
	import type { Square } from "./types";

  let { state, value, onclick } = $props<Square & {onclick: MouseEventHandler<EventTarget> }>();
</script>
<button {onclick} class="size-8 flex items-center justify-center" class:bg-teal-600={state !== 'revealed'} class:bg-gray-500={state === 'revealed'}>
  {#if state === 'flagged'}
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="size-6" fill="currentColor"><path d="M64 32C64 14.3 49.7 0 32 0S0 14.3 0 32V480c0 17.7 14.3 32 32 32s32-14.3 32-32V352H424c13.3 0 24-10.7 24-24c0-5.2-1.7-10.2-4.8-14.4L352 192 443.2 70.4c3.1-4.2 4.8-9.2 4.8-14.4c0-13.3-10.7-24-24-24H64z"/></svg>
  {:else if state === 'unknown'}

  {:else}
    {#if value === -1}
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="size-6" fill="currentColor"><path d="M459.1 52.4L442.6 6.5C440.7 2.6 436.5 0 432.1 0s-8.5 2.6-10.4 6.5L405.2 52.4l-46 16.8c-4.3 1.6-7.3 5.9-7.2 10.4c0 4.5 3 8.7 7.2 10.2l45.7 16.8 16.8 45.8c1.5 4.4 5.8 7.5 10.4 7.5s8.9-3.1 10.4-7.5l16.5-45.8 45.7-16.8c4.2-1.5 7.2-5.7 7.2-10.2c0-4.6-3-8.9-7.2-10.4L459.1 52.4zm-132.4 53c-12.5-12.5-32.8-12.5-45.3 0l-2.9 2.9C256.5 100.3 232.7 96 208 96C93.1 96 0 189.1 0 304S93.1 512 208 512s208-93.1 208-208c0-24.7-4.3-48.5-12.2-70.5l2.9-2.9c12.5-12.5 12.5-32.8 0-45.3l-80-80zM200 192c-57.4 0-104 46.6-104 104v8c0 8.8-7.2 16-16 16s-16-7.2-16-16v-8c0-75.1 60.9-136 136-136h8c8.8 0 16 7.2 16 16s-7.2 16-16 16h-8z"/></svg>
    {:else if value === 0}
    
    {:else}
    {value}
    {/if}
  {/if}
</button>