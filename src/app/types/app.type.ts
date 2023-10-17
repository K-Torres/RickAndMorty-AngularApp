export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  image: string;
  origin: {
    name: string;
  };
}

export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[]; 
  season: string;
}

export interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[]; 
}
