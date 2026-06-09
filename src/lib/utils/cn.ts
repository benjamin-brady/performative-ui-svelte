/**
 * Minimal classname joiner. Accepts strings, numbers, arrays, and
 * `{ class: condition }` dictionaries (mirrors clsx's `ClassValue`, which is
 * also the type Svelte uses for the `class` attribute). Returns a single
 * space-joined string.
 */
type ClassDictionary = Record<string, unknown>;
type ClassArray = ClassValue[];
export type ClassValue =
| ClassArray
| ClassDictionary
| string
| number
| bigint
| null
| boolean
| undefined;

export function cn(...inputs: ClassValue[]): string {
const out: string[] = [];
const walk = (v: ClassValue): void => {
if (!v) return;
if (typeof v === 'string' || typeof v === 'number' || typeof v === 'bigint') {
out.push(String(v));
} else if (Array.isArray(v)) {
v.forEach(walk);
} else if (typeof v === 'object') {
for (const key in v) {
if ((v as ClassDictionary)[key]) out.push(key);
}
}
};
inputs.forEach(walk);
return out.join(' ');
}
