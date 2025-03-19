/**
 * returns random integer between min (inclusive) and max (exclusive)
 * @param min minimum number
 * @param max maximum number
 * @returns random integer n where min <= n < max
 */
export function randint(min: number, max: number): number {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

export function choice<T>(candidates: T[]): T {
  const it = candidates.at(randint(0, candidates.length));
  if (!it) {
    throw new Error("unable to choose from empty array");
  }
  return it;
}
