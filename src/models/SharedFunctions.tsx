import { Pokemon } from "./Pokemon";
import { PokemonDetails } from "./PokemonDetails";
export async function getPokemon(id: number): Promise<Pokemon | undefined> {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if (!res.ok) {
      console.error(
        `Error fetching Pokemon data: ${res.status} ${res.statusText}`
      );
      return undefined;
    }
    const data: Pokemon = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching Pokemon data:", error);
    return undefined;
  }
}

export async function getPokemonDetails(
  id: number
): Promise<PokemonDetails | undefined> {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if (!res.ok) {
      console.error(
        `Error fetching Pokemon data: ${res.status} ${res.statusText}`
      );
      return undefined;
    }
    const data: PokemonDetails = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching Pokemon data:", error);
    return undefined;
  }
}

export function CapitalizeAndRemoveHyphen(str: string) {
  const words = str.split("-");
  return words
    .map((word) => {
      return word[0].toUpperCase() + word.substring(1);
    })
    .join(" ");
}
