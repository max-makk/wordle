<script>
	import { stats } from './stats';
	import { showStats } from './stats';
</script>

<div class="stats">
	<button on:click={() => ($showStats = !$showStats)}>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"
			><path
				d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"
			/></svg
		>
	</button>

	<div class="container">
		<div class="num">{$stats.totalGames}</div>
		<div class="label">Played</div>
	</div>

	<div class="container">
		<div class="num">{$stats.wonGames}</div>
		<div class="label">Win %</div>
	</div>

	<div class="container">
		<div class="num">{$stats.currentStreak}</div>
		<div class="label">Current Streak</div>
	</div>

	<div class="container">
		<div class="num">{$stats.maxStreak}</div>
		<div class="label">Max Streak</div>
	</div>
</div>

<style>
	.stats {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: var(--white);
		box-shadow: 0 0 2px 2px var(--black);
		color: var(--black);
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
	}

	button:hover {
		background-color: var(--light);
	}
</style>
