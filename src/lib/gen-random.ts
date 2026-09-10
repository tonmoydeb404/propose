type WithId = { id: string };

// picks a random item from source that isn't already present (by id) in target
export const genRandom = <T extends WithId>(
  source: T[] = [],
  target: T[] = [],
): T => {
  if (!source.length) throw new Error("source is empty");

  const random = source[Math.floor(Math.random() * source.length)];
  const alreadyIn = target.find((item) => item.id === random.id);

  if (alreadyIn) return genRandom(source, target);

  return random;
};
