export const Directions = {
  North: "North",
  West: "West",
  South: "South",
  East: "East",
} as const;

export type Direction = (typeof Directions)[keyof typeof Directions];
