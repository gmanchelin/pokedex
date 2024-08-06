export interface PokemonDetails {
  id: number;
  species: {
    name: string;
  };
  sprites: {
    other: {
      home: {
        front_default: string;
        front_shiny: string;
      };
    };
  };
  types: {
    type: {
      name: string;
    };
  }[];
  abilities: {
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  }[];
}
