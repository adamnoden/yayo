interface AllocationMap {
  [level: number]: number;
}

/**
 * Maps a fund level to the allocation limit per member for each week
 */
export const FUND_LEVEL_ALLOCATION_MAP: AllocationMap = {
  1: 100,
  2: 1_000,
  3: 10_000,
  4: 50_000,
  5: 100_000,
  6: 250_000,
  7: 1_000_000,
};
