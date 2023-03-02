<script>
	import { fade } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
</script>

<div class="rules" transition:fade>
	<div class="text-column">
		<button on:click={() => dispatch('handleClick', 'toggleRules')} aria-label="close">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"
				><path
					d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"
				/></svg
			>
		</button>
		<h1>Как играть</h1>

		<p>
			Русскоязычная версия <a href="https://www.nytimes.com/games/wordle/index.html">Wordle</a>,
			игры на угадывание слов. Чтобы играть, введите слово из пяти букв. Например:
		</p>

		<div class="example">
			<span class="missing">з</span>
			<span class="close">и</span>
			<span class="missing">п</span>
			<span class="close">у</span>
			<span class="exact">н</span>
		</div>

		<p>
			Буква <span class="exact">н</span> находится в правильном месте. Буквы
			<span class="close">и</span>
			и
			<span class="close">у</span>
			есть в слове, но не в правильных местах. Остальных букв нет в слове. Давайте сделаем еще одно предположение:
		</p>

		<div class="example">
			<span class="exact">р</span>
			<span class="exact">у</span>
			<span class="exact">б</span>
			<span class="exact">и</span>
			<span class="exact">н</span>
		</div>

		<p>
			На этот раз мы угадали правильно! У вас есть <strong>шесть</strong> попыток, чтобы угадать слово.
		</p>
	</div>
</div>

<style>
	.rules {
		position: absolute;
		background-color: var(--color-bg);
		top: 12%;
		display: flex;
		flex-direction: column;
		left: 50%;
		transform: translate(-50%, 0);
		box-shadow: 0 4px 23px 0 rgb(0 0 0 / 20%);
		overflow-y: auto;
		width: 90%;
		max-height: 80%;
		max-width: 48rem;
	}

	.text-column {
		display: flex;
		flex: 0.6;
		flex-direction: column;
		justify-content: center;
		color: var(--color-text);
		padding: 1em;
	}

	span {
		display: inline-flex;
		justify-content: center;
		align-items: center;
		font-size: 0.8em;
		width: 2.4em;
		height: 2.4em;
		background-color: white;
		box-sizing: border-box;
		border-radius: 2px;
		border-width: 2px;
		color: var(--black);
	}

	.missing {
		background-color: var(--gray);
	}

	.close {
		background-color: var(--yellow);
	}

	.exact {
		background-color: var(--green);
	}

	.example {
		display: flex;
		justify-content: flex-start;
		margin: 1rem 0;
		gap: 0.2rem;
	}

	.example span {
		font-size: 1.4rem;
	}

	p span {
		position: relative;
		border-width: 1px;
		border-radius: 1px;
		font-size: 0.4em;
		transform: scale(2) translate(0, -10%);
		margin: 0 1em;
	}

	path {
		fill: var(--color-text);
		transition: fill 0.3s ease;
	}

	button {
		width: 2.4em;
		height: 2.4em;
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
		transition: background-color 0.3s ease;
	}

	button:hover {
		background-color: var(--color-text);
	}
	button:hover path {
		fill: var(--color-bg);
	}
</style>
