import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import type { Writable } from 'svelte/store';

interface Stats {
	totalGames: number;
	wonGames: number;
	lostGames: number;
	winRate: number;
	currentStreak: number;
	maxStreak: number;
	game: string;
}

function createStats() {
	let saved: null | string = null;
	if (browser) {
		saved = localStorage.getItem('wordle-ru');
	}

	const stats = {
		totalGames: 0,
		wonGames: 0,
		lostGames: 0,
		winRate: 0,
		currentStreak: 0,
		maxStreak: 0,
		game: ''
	};

	const { update, subscribe }: Writable<Stats> = writable(saved ? JSON.parse(saved) : stats);

	return {
		subscribe,
		finish: (result: boolean, game: string) =>
			update((value) => {
				if (game === value.game) {
					return { ...value };
				}
				const totalGames = value.totalGames + 1;
				const wonGames = result ? value.wonGames + 1 : value.wonGames;
				const lostGames = result ? value.lostGames : value.lostGames + 1;
				const winRate = Math.round((100 * wonGames) / Math.max(totalGames, 1));
				const currentStreak = result ? value.currentStreak + 1 : 0;

				const maxStreak = currentStreak > value.maxStreak ? currentStreak : value.maxStreak;
				return {
					...value,
					totalGames,
					wonGames,
					lostGames,
					winRate,
					currentStreak,
					maxStreak,
					game: game
				};
			})
	};
}

export const stats = createStats();

stats.subscribe((value) => {
	if (browser) {
		localStorage.setItem('wordle-ru', JSON.stringify(value));
	}
});

export const showStats = writable(false);
