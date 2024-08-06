export const FIRST_POKEMON_ID: number = 1;
export const LAST_POKEMON_ID: number = 1025;

export function CapitalizeAndRemoveHyphen(str: string) {
  const words = str.split("-");
  return words
    .map((word) => {
      return word[0].toUpperCase() + word.substring(1);
    })
    .join(" ");
}
