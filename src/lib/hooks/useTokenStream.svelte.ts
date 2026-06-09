import { untrack } from 'svelte';

export interface UseTokenStreamOptions {
	text: string;
	/** [min, max] ms between tokens. Single number → fixed delay. */
	speedMs?: number | [number, number];
	/** Tokenizer: split text into atoms. Default: words+whitespace. */
	tokenize?: (text: string) => string[];
	loop?: boolean;
	/** ms to wait after a full pass before clearing & restarting. */
	loopDelayMs?: number;
	onComplete?: () => void;
}

export interface UseTokenStreamResult {
	readonly output: string;
	readonly isStreaming: boolean;
	readonly isComplete: boolean;
}

const defaultTokenize = (s: string) => s.split(/(\s+)/);

/** Reveals `text` token-by-token. The fake AI-streaming demo. */
export function useTokenStream(options: UseTokenStreamOptions): UseTokenStreamResult {
	let output = $state('');
	let isComplete = $state(false);
	let onCompleteCurrent = options.onComplete;

	$effect(() => {
		onCompleteCurrent = options.onComplete;
	});

	$effect(() => {
		const { text, speedMs, tokenize, loop, loopDelayMs } = untrack(() => ({
			text: options.text,
			speedMs: options.speedMs ?? [18, 80],
			tokenize: options.tokenize ?? defaultTokenize,
			loop: options.loop ?? false,
			loopDelayMs: options.loopDelayMs ?? 6000
		}));

		let cancelled = false;
		let timer: ReturnType<typeof setTimeout> | null = null;
		const tokens = tokenize(text);

		const pickDelay = () =>
			Array.isArray(speedMs) ? speedMs[0] + Math.random() * (speedMs[1] - speedMs[0]) : speedMs;

		const run = () => {
			let i = 0;
			let buf = '';
			const tick = () => {
				if (cancelled) return;
				if (i >= tokens.length) {
					isComplete = true;
					onCompleteCurrent?.();
					if (loop) {
						timer = setTimeout(() => {
							if (cancelled) return;
							isComplete = false;
							output = '';
							run();
						}, loopDelayMs);
					}
					return;
				}
				buf += tokens[i];
				i += 1;
				output = buf;
				timer = setTimeout(tick, pickDelay());
			};
			tick();
		};
		run();
		return () => {
			cancelled = true;
			if (timer) clearTimeout(timer);
		};
	});

	return {
		get output() {
			return output;
		},
		get isStreaming() {
			return !isComplete;
		},
		get isComplete() {
			return isComplete;
		}
	};
}
