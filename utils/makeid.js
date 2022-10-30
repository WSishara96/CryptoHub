export const makeId = (length) => {
  let results = '';

  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;

  for (let i = 0; i < length; i += 1) {
    results += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return results;
};
