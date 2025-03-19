export const Colors = {
  Black: "Black",
  Red: "Red",
  Green: "Green",
  Blue: "Blue",
  Yellow: "Yellow",
} as const;

export type Color = (typeof Colors)[keyof typeof Colors];
