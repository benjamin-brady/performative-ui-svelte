import { untrack } from 'svelte';

export interface UseTypewriterOptions {
	words: string[];
	/** ms per character while typing */
	typeMs?: number;
	/** ms per character while deleting */
	deleteMs?: number;
	/** ms to hold the fully-typed word before deleting */
	holdMs?: number;
	/** stop after a single pass through `words` */
	loop?: boolean;
	/** fired each time a full word is displayed (end of type) */
	onWordReached?: (word: string, index: number) => void;
}

export interface UseTypewriterResult {
	readonly word: string;
	/** index of the *target* word (currently being typed/deleted) */
	readonly index: number;
	readonly isDeleting: boolean;
	readonly isComplete: boolean;
}

/**
 * Headless typewriter rune. Returns reactive text on every tick; pair with
 * any UI you like. Mirrors the React `useTypewriter` hook: the loop arms once
 * on mount and does not react to option changes (snapshot via `untrack`).
 */
export function useTypewriter(options: UseTypewriterOptions): UseTypewriterResult {
	let word = $state('');
	let index = $state(0);
	let isDeleting = $state(false);
	let isComplete = $state(false);

	$effect(() => {
		// Snapshot options once so the loop matches React's mount-once behavior.
		const { words, typeMs, deleteMs, holdMs, loop, onWordReached } = untrack(() => ({
			words: options.words,
			typeMs: options.typeMs ?? 70,
			deleteMs: options.deleteMs ?? 32,
			holdMs: options.holdMs ?? 1500,
			loop: options.loop ?? true,
			onWordReached: options.onWordReached
		}));

		if (!words.length) return;

		let timer: ReturnType<typeof setTimeout> | null = null;
		let cancelled = false;

		const tick = () => {
			if (cancelled) return;
			const curWord = word;
			const curIdx = index;
			const curDel = isDeleting;
			const target = words[curIdx];
			const next = curDel ? target.slice(0, curWord.length - 1) : target.slice(0, curWord.length + 1);
			word = next;

			if (!curDel && next === target) {
				onWordReached?.(target, curIdx);
				if (!loop && curIdx === words.length - 1) {
					isComplete = true;
					return;
				}
				timer = setTimeout(() => {
					if (cancelled) return;
					isDeleting = true;
					timer = setTimeout(tick, deleteMs);
				}, holdMs);
				return;
			}
			if (curDel && next === '') {
				isDeleting = false;
				index = (curIdx + 1) % words.length;
			}
			timer = setTimeout(tick, curDel ? deleteMs : typeMs);
		};

		timer = setTimeout(tick, typeMs);
		return () => {
			cancelled = true;
			if (timer) clearTimeout(timer);
		};
	});

	return {
		get word() {
			return word;
		},
		get index() {
			return index;
		},
		get isDeleting() {
			return isDeleting;
		},
		get isComplete() {
			return isComplete;
		}
	};
}
