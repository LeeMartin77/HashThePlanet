import './app.css'
import App from './App.svelte'

import { get } from "svelte/store";
import { hashRate, hashCount } from "./lib/stores";

// This is my game loop
// there are many like it but this is mine

const loopRateMs = 50

setInterval(() => {
    hashCount.update((val) => {
        return parseFloat((val + (get(hashRate) * (loopRateMs / 1000))).toFixed(5))
    })
}, loopRateMs);

const app = new App({
  target: document.getElementById('app')!,
})

export default app
