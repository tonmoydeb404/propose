/* eslint-disable import/prefer-default-export */
export const genRandom = (source = [], target = []) => {
    if (!source.length) throw Error('source is empty');

    const random = source[Math.floor(Math.random() * source.length)];
    const alreadyIn = target.length ? target.find((item) => item.id === random.id) : undefined;

    if (alreadyIn) return genRandom(source, target);

    return random;
};
