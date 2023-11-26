import './app.css'
//@ts-ignore
import App from './App.svelte'

import { get } from "svelte/store";
import { hashRate, hashCount, saveData, lifetimeHashCount } from "./lib/stores";

// This is my game loop
// there are many like it but this is mine

const loopRateMs = 50

setInterval(() => {
    hashCount.update((val) => {
        return parseFloat((val + (get(hashRate) * (loopRateMs / 1000))).toFixed(5))
    })
}, loopRateMs);

// autosave hashrates/counts

setInterval(() => {
  saveData({hashRate, hashCount, lifetimeHashCount})
}, 15 * 1000)

const app = new App({
  target: document.getElementById('app')!,
})

export default app
