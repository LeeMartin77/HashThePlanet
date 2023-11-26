import { test, expect, describe } from 'vitest';
import { recalculateHashRates } from './engine';

describe('recalculateHashRates', () => {
  describe('auto hash rate', () => {
    test('nothing gives 0', () => {
      const { hashRate } = recalculateHashRates({}, { ALL: [] }, {}, {})
      expect(hashRate).toBe(0)
    })

    test.each([[1, 10], [2, 20], [4, 40]])('%s without upgrades comes out at %s', (count, total) => {
      const { hashRate } = recalculateHashRates({'TEST_ENTITY': count}, { ALL: [] }, {'TEST_ENTITY':{ baseHashRate: 10 }}, {})
      expect(hashRate).toBe(total)
    })

    test.each([[1, 15], [2, 30], [4, 60]])('%s with 50% upgrade comes out at %s', (count, total) => {
      const { hashRate } = recalculateHashRates(
        {'TEST_ENTITY': count}, 
        { ALL: [], 'TEST_ENTITY': ['TEST_UPGRADE'] }, 
        {'TEST_ENTITY':{ baseHashRate: 10 }}, 
        {'TEST_UPGRADE': { effect: (acc, baseHashRate, count) => {
          return acc * 1.5;
        }}})
      expect(hashRate).toBe(total)
    })


    test.each([[1, 30], [2, 60], [4, 120]])('%s with dual upgrades comes out at %s', (count, total) => {
      const { hashRate } = recalculateHashRates(
        {'TEST_ENTITY': count}, 
        { ALL: [], 'TEST_ENTITY': ['TEST_UPGRADE', 'TEST_UPGRADE_2'] }, 
        {'TEST_ENTITY':{ baseHashRate: 10 }}, 
        {'TEST_UPGRADE': { effect: (acc, baseHashRate, count) => {
          return acc * 1.5;
        }},
        'TEST_UPGRADE_2': { effect: (acc, baseHashRate, count) => {
          return acc * 2;
        }}})
      expect(hashRate).toBe(total)
    })
  })
})