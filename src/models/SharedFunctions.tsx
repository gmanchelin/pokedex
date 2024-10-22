import { Trainer } from "./Trainer";
import { Pokemon } from "./Pokemon";
import { PokemonDetails } from "./PokemonDetails";
import { PokemonSpecies } from "./PokemonSpecies";
import { User } from "./User";
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

export async function getPokemonSpecies(id: number): Promise<PokemonSpecies | undefined> {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
    if (!res.ok) {
      console.error(
        `Error fetching Pokemon data: ${res.status} ${res.statusText}`
      );
      return undefined;
    }
    const data: PokemonSpecies = await res.json();
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

export async function getTrainers(): Promise<Trainer[]> {
  const res = await fetch("http://localhost:8080/api/trainers").then(
    (res) => res.json()
  );
  return res;
}

export function CapitalizeAndRemoveHyphen(str: string) {
  const words = str.split("-");
  return words
    .map((word) => {
      return word[0].toUpperCase() + word.substring(1);
    })
    .join(" ");
}

export function parseJwt(token: string) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  return JSON.parse(jsonPayload);
}

export async function fetchUser(): Promise<User> {
  const token = localStorage.getItem("token");
  const username = parseJwt(token!).sub;
  console.log(token);
  const res = await fetch(`http://localhost:8080/api/users/${username}`, {
    method: "GET",
    headers: {
      'Authorization': `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then(
    (res) => res.json()
  );
  return res;
}