<script lang="ts">
  import Tile from "./Tile.svelte";
  import { clearSafeArea, createMinefield, fillInMines, flagCount, gameState } from "./field.svelte";
  import type { Level } from "./types";

  let { width, height, mines } = $props<Level>();
  const field = createMinefield({ width, height, mines });
  const remaining = $derived(mines - flagCount(field));
  const game = $derived(gameState(field, mines));
  let empty = $state(true);
  
  function tileClick(ev: MouseEvent, x: number, y: number) {
    ev.preventDefault();
    if (game !== 'none') return;
    const newState = field[y][x].state === 'flagged' ? 'unknown' : (ev.shiftKey ? 'flagged' : 'revealed');
    if (newState === 'revealed') {
      if (empty) {
        fillInMines(field, [x, y], mines);
        empty = false;
      }
      clearSafeArea(field, [x, y]);
    } else {
      field[y][x].state = newState;
    }
  }
</script>
<div class="flex flex-col gap-4">
  <div class="flex flex-col gap-px">
    {#each field as row, y}
    <div class="flex gap-px">
      {#each row as cell, x}
        <Tile {...cell} onclick={(ev) => tileClick(ev, x, y)} />
      {/each}
    </div>
      
    {/each}
  </div>
  <div class="p-4 rounded bg-gray-200 dark:bg-gray-800 flex justify-between">
    <span>Mines: {remaining}</span>
    <span>{#if game !== 'none'}{game}{/if}</span>
  </div>
</div>