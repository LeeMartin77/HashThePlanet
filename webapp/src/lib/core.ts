import { get, writable } from 'svelte/store';

export const hashCount = writable(0);
export const hashRate = writable(0.1);

hashCount.subscribe((value) => {
	console.log(value);
}); // logs '0'


// count.set(1); // logs '1'

// count.update((n) => n + 1); // logs '2'

const loopRateMs = 50

setInterval(() => {
    hashCount.update((val) => {
        return parseFloat((val + (get(hashRate) * (loopRateMs / 1000))).toFixed(5))
    })
}, loopRateMs);