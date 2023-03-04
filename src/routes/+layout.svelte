<script lang="ts">
	import Header from './Header.svelte';
	import Statistics from './Statistics.svelte';
	import HowToPlay from './HowToPlay.svelte';
	import './styles.css';

	let showStats = false;
	let showRules = false;

	function handleClick(e: CustomEvent) {
		if (e.detail === 'openStats') {
			showStats = true;
			showRules = false;
		} else if (e.detail === 'openRules') {
			showRules = true;
			showStats = false;
		} else if (e.detail === 'closeStats') {
			showStats = false;
		} else if (e.detail === 'closeRules') {
			showRules = false;
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
		padding: 0 1em;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>
