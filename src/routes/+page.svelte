<script lang="ts">
	import { enhance } from '$app/forms';
	import { fade } from 'svelte/transition';
	import type { PageData, ActionData } from './$types';
	import { stats } from './stats';

	export let data: PageData;

	export let form: ActionData;

	/** Whether or not the user has won */
	$: won = data.answers.at(-1) === 'xxxxx';

	/** The index of the current guess */
	$: i = won ? -1 : data.answers.length;

	/** Whether the current guess can be submitted */
	$: submittable = data.guesses[i]?.length === 5;

	/**
	 * A map of classnames for all letters that have been guessed,
	 * used for styling the keyboard
	 */
	let classnames: Record<string, 'exact' | 'close' | 'missing'>;

	/**
	 * A map of descriptions for all letters that have been guessed,
	 * used for adding text for assistive technology (e.g. screen readers)
	 */
	let description: Record<string, string>;

	$: {
		classnames = {};
		description = {};

		data.answers.forEach((answer, i) => {
			const guess = data.guesses[i];

			for (let i = 0; i < 5; i += 1) {
				const letter = guess[i];

				if (answer[i] === 'x') {
					classnames[letter] = 'exact';
					description[letter] = 'correct';
				} else if (!classnames[letter]) {
					classnames[letter] = answer[i] === 'c' ? 'close' : 'missing';
					description[letter] = answer[i] === 'c' ? 'present' : 'absent';
				}
			}
		});
	}

	$: if (won || data.answers.length >= 6) {
		const str = JSON.stringify(data);
		stats.finish(won, str);
	}

	/**
	 * Modify the game state without making a trip to the server,
	 * if client-side JavaScript is enabled
	 */
	function update(event: MouseEvent) {
		const guess = data.guesses[i];
		const key = (event.target as HTMLButtonElement).getAttribute('data-key');

		if (key === 'backspace') {
			data.guesses[i] = guess.slice(0, -1);
			if (form?.badGuess) form.badGuess = false;
		} else if (guess.length < 5) {
			data.guesses[i] += key;
		}
	}

	/**
	 * Trigger form logic in response to a keydown event, so that
	 * desktop users can use the keyboard to play the game
	 */
	function keydown(event: KeyboardEvent) {
		if (event.metaKey) return;

		document
			.querySelector(`[data-key="${event.key}" i]`)
			?.dispatchEvent(new MouseEvent('click', { cancelable: true }));
	}
</script>

<svelte:window on:keydown={keydown} />

<svelte:head>
	<title>Wordle</title>
	<meta name="description" content="Игра Wordle на русском без ограничений." />
</svelte:head>

<h1 class="visually-hidden">Wordle</h1>

<form
	method="POST"
	action="?/enter"
	use:enhance={() => {
		// prevent default callback from resetting the form
		return ({ update }) => {
			update({ reset: false });
		};
	}}
>
	<div class="grid" class:bad-guess={form?.badGuess}>
		{#each Array(6) as _, row}
			{@const current = row === i}
			<h2 class="visually-hidden">Row {row + 1}</h2>
			<div class="row" class:current>
				{#each Array(5) as _, column}
					{@const answer = data.answers[row]?.[column]}
					{@const value = data.guesses[row]?.[column] ?? ''}
					{@const selected = current && column === data.guesses[row].length}
					{@const exact = answer === 'x'}
					{@const close = answer === 'c'}
					{@const missing = answer === '_'}
					<div
						class="letter"
						class:exact
						class:close
						class:missing
						class:selected
						style:animation-delay={column * 100 + 'ms'}
					>
						{value}
						<span class="visually-hidden">
							{#if exact}
								(correct)
							{:else if close}
								(present)
							{:else if missing}
								(absent)
							{:else}
								empty
							{/if}
						</span>
						<input name="guess" disabled={!current} type="hidden" {value} />
					</div>
				{/each}
			</div>
		{/each}
	</div>

	<div class="controls">
		{#if won || data.answers.length >= 6}
			{#if !won && data.answer}
				<p in:fade>ответ был "{data.answer}"</p>
			{/if}
			<button in:fade data-key="enter" class="restart selected" formaction="?/restart">
				{won ? 'вы выиграли :)' : `игра окончена :(`} играть снова?
			</button>
		{:else}
			<div in:fade class="keyboard">
				{#each ['йцукенгшщзхъ', 'фывапролджэ', 'EячсмитьбюD'] as row}
					<div class="row">
						{#each row as letter}
							{#if letter === 'E'}
								<button data-key="enter" class:selected={submittable} disabled={!submittable}
									>&#x21b5;</button
								>
							{:else if letter === 'D'}
								<button
									on:click|preventDefault={update}
									data-key="backspace"
									formaction="?/update"
									name="key"
									value="backspace"
								>
									&#x232B;
								</button>
							{:else}
								<button
									on:click|preventDefault={update}
									data-key={letter}
									class={classnames[letter]}
									disabled={data.guesses[i].length === 5}
									formaction="?/update"
									name="key"
									value={letter}
									aria-label="{letter} {description[letter] || ''}"
								>
									{letter}
								</button>
							{/if}
						{/each}
					</div>
				{/each}
			</div>
		{/if}
	</div>
</form>

<style>
	form {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		flex: 1;
	}

	.grid {
		--width: min(100vw, 40vh, 380px);
		margin-top: 1em;
		max-width: var(--width);
		align-self: center;
		justify-self: center;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
	}

	.grid .row {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		grid-gap: 0.2rem;
		margin: 0 0 0.2rem 0;
	}

	.grid.bad-guess .row.current {
		animation: wiggle 0.5s;
	}

	.letter {
		aspect-ratio: 1;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		box-sizing: border-box;
		text-transform: uppercase;
		border: none;
		font-size: calc(0.08 * var(--width));
		border-radius: 2px;
		margin: 0;
		border: 2px solid var(--light);
		font-weight: 700;
		color: var(--color-text);
	}

	.letter.missing {
		--color-bg-letter: var(--gray);
		--color-border-letter: var(--gray);
	}

	.letter.exact {
		--color-bg-letter: var(--green);
		--color-border-letter: var(--green);
	}

	.letter.close {
		--color-bg-letter: var(--yellow);
		--color-border-letter: var(--yellow);
	}

	.letter.exact,
	.letter.close,
	.letter.missing {
		color: var(--black);
		animation-name: Flip;
		animation-duration: 500ms;
		animation-timing-function: ease;
		animation-fill-mode: forwards;
	}

	@keyframes Flip {
		0% {
			transform: rotateX(0deg);
		}
		45% {
			transform: rotateX(90deg);
		}
		55% {
			transform: rotateX(90deg);
		}
		100% {
			transform: rotateX(0deg);
			background-color: var(--color-bg-letter);
			border-color: var(--color-border-letter);
		}
	}

	.selected {
		border-color: var(--blue);
	}

	.controls {
		text-align: center;
		justify-content: center;
		height: 10em;
		width: 100%;
	}

	.keyboard {
		--gap: 0.2rem;
		position: relative;
		display: flex;
		flex-direction: column;
		gap: var(--gap);
		height: 100%;
	}

	.keyboard .row {
		display: flex;
		justify-content: center;
		gap: 0.2rem;
		flex: 1;
	}

	.keyboard button,
	.keyboard button:disabled {
		--size: 32px;
		background-color: var(--light);
		color: var(--black);
		width: var(--size);
		border: none;
		border-radius: 2px;
		font-size: calc(var(--size) * 0.5);
		margin: 0;
		text-transform: uppercase;
		font-weight: 700;
		cursor: pointer;
	}

	.keyboard button.exact {
		background-color: var(--green);
	}

	.keyboard button.missing {
		background-color: var(--gray);
	}

	.keyboard button.close {
		background-color: var(--yellow);
	}

	.keyboard button:focus {
		background: var(--blue);
		color: var(--white);
		outline: none;
	}

	.keyboard button[data-key='enter'],
	.keyboard button[data-key='backspace'] {
		width: calc(1.5 * var(--size));
	}

	.keyboard button[data-key='enter']:disabled {
		opacity: 0.5;
	}

	.keyboard button.selected {
		outline: 2px solid var(--blue);
	}

	.restart {
		padding: 1rem;
		background: var(--color-bg);
		color: var(--color-text);
		outline: 2px solid var(--blue);
		border: none;
		border-radius: 2px;
		cursor: pointer;
	}

	.restart:focus,
	.restart:hover {
		background: var(--blue);
		color: var(--white);
	}

	@keyframes wiggle {
		0% {
			transform: translateX(0);
		}
		10% {
			transform: translateX(-2px);
		}
		30% {
			transform: translateX(4px);
		}
		50% {
			transform: translateX(-6px);
		}
		70% {
			transform: translateX(+4px);
		}
		90% {
			transform: translateX(-2px);
		}
		100% {
			transform: translateX(0);
		}
	}
</style>
