<script lang="ts">
	import { onMount } from 'svelte';
	import { enhance, type SubmitFunction } from '$app/forms';
	import { fade } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	let nextTheme = 'dark';

	onMount(() => {
		if (document.documentElement.dataset.theme) {
			nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
		}
	});

	const submitUpdateTheme: SubmitFunction = ({ action }) => {
		const theme = action.searchParams.get('theme');
		nextTheme = theme === 'dark' ? 'light' : 'dark';
		if (theme) {
			document.documentElement.setAttribute('data-theme', theme);
		}
	};
</script>

<header>
	<div class="title">Wordle</div>
	<nav>
		<ul>
			<li>
				<button on:click={() => dispatch('handleClick', 'openRules')} aria-label="Help">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
						><path
							d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm169.8-90.7c7.9-22.3 29.1-37.3 52.8-37.3h58.3c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24V250.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1H222.6c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"
						/></svg
					>
				</button>
			</li>
			<li>
				<button on:click={() => dispatch('handleClick', 'openStats')} aria-label="Statistics">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
						><path
							d="M160 80c0-26.5 21.5-48 48-48h32c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H208c-26.5 0-48-21.5-48-48V80zM0 272c0-26.5 21.5-48 48-48H80c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V272zM368 96h32c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H368c-26.5 0-48-21.5-48-48V144c0-26.5 21.5-48 48-48z"
						/></svg
					>
				</button>
			</li>
			<li>
				<form method="POST" use:enhance={submitUpdateTheme}>
					<button formaction="/?/setTheme&theme={nextTheme}" aria-label="darkMode">
						{#if nextTheme === 'light'}
							<svg in:fade xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
								><path
									d="M361.5 1.2c5 2.1 8.6 6.6 9.6 11.9L391 121l107.9 19.8c5.3 1 9.8 4.6 11.9 9.6s1.5 10.7-1.6 15.2L446.9 256l62.3 90.3c3.1 4.5 3.7 10.2 1.6 15.2s-6.6 8.6-11.9 9.6L391 391 371.1 498.9c-1 5.3-4.6 9.8-9.6 11.9s-10.7 1.5-15.2-1.6L256 446.9l-90.3 62.3c-4.5 3.1-10.2 3.7-15.2 1.6s-8.6-6.6-9.6-11.9L121 391 13.1 371.1c-5.3-1-9.8-4.6-11.9-9.6s-1.5-10.7 1.6-15.2L65.1 256 2.8 165.7c-3.1-4.5-3.7-10.2-1.6-15.2s6.6-8.6 11.9-9.6L121 121 140.9 13.1c1-5.3 4.6-9.8 9.6-11.9s10.7-1.5 15.2 1.6L256 65.1 346.3 2.8c4.5-3.1 10.2-3.7 15.2-1.6zM160 256a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zm224 0a128 128 0 1 0 -256 0 128 128 0 1 0 256 0z"
								/></svg
							>
						{:else}
							<svg in:fade xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"
								><path
									d="M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"
								/></svg
							>
						{/if}
					</button>
				</form>
			</li>
		</ul>
	</nav>
</header>

<style>
	header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.5em 1em;
		box-shadow: 0 2px var(--light);
	}

	.title {
		font-size: 1.2rem;
	}

	svg {
		width: 1.5em;
		height: 1.5em;
	}

	path {
		fill: var(--color-text);
		transition: fill 0.5s ease;
	}

	ul {
		margin: 0;
		padding: 0;
		display: flex;
		align-items: center;
		list-style: none;
		gap: 1em;
	}

	nav button {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: transparent;
		border: none;
		color: var(--color-text);
		font-weight: 700;
		font-size: 1rem;
		transition: color 0.2s linear;
		cursor: pointer;
		padding: 0.5em;
		transition: box-shadow 0.3s ease;
		box-shadow: 0px 3px transparent;
	}

	button:hover {
		box-shadow: inset 0px -3px var(--color-text);
	}
</style>
