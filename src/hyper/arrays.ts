export const equals =
  <T>(eq: (x: T, y: T) => boolean) =>
  (xs: T[], ys: T[]): boolean =>
    xs.length === ys.length && xs.every((x, i) => eq(x, ys[i]));
