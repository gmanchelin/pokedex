export interface Pokemon {
  id: number;
  species: {
    name: string;
  };
  types: {
    type: {
      name: string;
    };
  }[];
}
