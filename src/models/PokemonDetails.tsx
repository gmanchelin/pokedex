export interface PokemonDetails {
  id: number;
  species: {
    name: string;
    url: string;
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
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
    };
  }[];
  moves: {
    move: {
      name: string;
    },
    version_group_details: {
      level_learned_at: number;
      move_learn_method: {
        name: string;
        url: string;
      }
      version_group: {
        name: string;
      };
    }[]
  }[];  
}
