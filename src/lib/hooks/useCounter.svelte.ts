import { untrack } from 'svelte';

export interface UseCounterOptions {
	target: number;
	/** ms of total animation. */
	durationMs?: number;
	/** Starting value. Defaults to 0. */
	from?: number;
	/** Easing fn (t∈[0,1]). Default ease-out-cubic. */
	ease?: (t: number) => number;
}

export interface UseCounterResult {
	readonly value: number;
}

/**
 * Animates a number from `from` to `target` over `durationMs`. Mirrors the
 * React hook's mount-only animation with a run-once option snapshot.
 */
export function useCounter(options: UseCounterOptions): UseCounterResult {
	let value = $state(options.from ?? 0);

	$effect(() => {
		const { target, durationMs, from, ease } = untrack(() => ({
			target: options.target,
			durationMs: options.durationMs ?? 1800,
			from: options.from ?? 0,
			ease: options.ease ?? ((t: number) => 1 - Math.pow(1 - t, 3))
		}));

		value = from;
		let raf = 0;
		const start = performance.now();
		const step = (now: number) => {
			const t = Math.min(1, (now - start) / durationMs);
			value = Math.floor(from + (target - from) * ease(t));
			if (t < 1) raf = requestAnimationFrame(step);
		};
		raf = requestAnimationFrame(step);
		return () => cancelAnimationFrame(raf);
	});

	return {
		get value() {
			return value;
		}
	};
}
