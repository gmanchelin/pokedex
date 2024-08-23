export interface Pokemon {
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
}
