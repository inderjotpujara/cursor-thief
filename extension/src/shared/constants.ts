/* Animation timings, layered against the 5-6s spec budget for safe restoration. */
export const TIMINGS = {
  ARRIVE_MS: 700,
  STEAL_MS: 300,
  EXIT_MS: 600,
  WAIT_MS: 1500,
  RETURN_MS: 600,
  RESTORE_MS: 400,
};

export const TOTAL_BUDGET_MS =
  TIMINGS.ARRIVE_MS +
  TIMINGS.STEAL_MS +
  TIMINGS.EXIT_MS +
  TIMINGS.WAIT_MS +
  TIMINGS.RETURN_MS +
  TIMINGS.RESTORE_MS;

export const MAX_BUBBLE_CHARS = 140;

export const PALETTE = {
  ink: "#2A2620",
  paper: "#F5EFE2",
  amber: "#E8743C",
  mustard: "#E8B547",
  midnight: "#1B1A24",
};

/* Maximum 32-bit signed int — used to keep our overlay above pages that
   set their own absurd z-index ladders. */
export const Z_TOP = 2147483647;

export const CREATURE_BASE_WIDTH = 88;
