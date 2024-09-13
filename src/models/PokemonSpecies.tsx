export interface PokemonSpecies {
    varieties: {
        is_default: boolean,
        pokemon: {
            name: string
            url: string
        }
    }[]
}