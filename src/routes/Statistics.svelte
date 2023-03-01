<script>
	import { stats } from './stats';
	import { fade } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
</script>

<div class="stats" transition:fade>
	<button on:click={() => dispatch('handleClick', 'toggleStats')}>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"
			><path
				d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"
			/></svg
		>
	</button>

	<div class="container">
		<div class="num">{$stats.totalGames}</div>
		<div>Сыграно</div>
	</div>

	<div class="container">
		<div class="num">{$stats.wonGames}</div>
		<div>Выиграно %</div>
	</div>

	<div class="container">
		<div class="num">{$stats.currentStreak}</div>
		<div>Текущая серия</div>
	</div>

	<div class="container">
		<div class="num">{$stats.maxStreak}</div>
		<div>Максимальная серия</div>
	</div>
</div>

<style>
	.stats {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: var(--color-bg);
		box-shadow: 0 4px 23px 0 rgb(0 0 0 / 20%);
		color: var(--color-text);
		z-index: 5;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 1em 1em 2em;
		gap: 1em;
		width: 50%;
		max-width: 28em;
		text-align: center;
	}

	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.num {
		font-size: 2rem;
		font-weight: 700;
	}

	path {
		fill: var(--color-text);
		transition: fill 0.5s ease;
	}

	button {
		width: 2.5em;
		height: 2.5em;
		align-self: flex-end;
		display: flex;
		justify-content: center;
		align-items: center;
		border: none;
		outline: none;
		border-radius: 50%;
		cursor: pointer;
		background-color: transparent;
		padding: 0.5em;
		transition: background-color 0.5s ease;
	}

	button:hover {
		background-color: var(--color-text);
	}
	button:hover path {
		fill: var(--color-bg);
	}
</style>
