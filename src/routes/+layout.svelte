<script lang="ts">
	import Header from './Header.svelte';
	import Statistics from './Statistics.svelte';
	import HowToPlay from './HowToPlay.svelte';
	import './styles.css';

	let showStats = false;
	let showRules = false;

	function handleClick(e: CustomEvent) {
		if (e.detail === 'toggleStats') {
			showStats = !showStats;
			showRules = false;
		} else if (e.detail === 'toggleRules') {
			showRules = !showRules;
			showStats = false;
		}
	}
</script>

<div class="app">
	<Header on:handleClick={handleClick} />

	<main>
		<slot />
	</main>

	{#if showStats}
		<Statistics on:handleClick={handleClick} />
	{/if}
	{#if showRules}
		<HowToPlay on:handleClick={handleClick} />
	{/if}
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>
