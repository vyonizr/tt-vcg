export interface IPokemonAPIResponse {
  count: number
  next: string
  previous: any
  results: Pokemon[]
}

export interface IPokemonDetailAPIResponse {
  base_experience: number
  forms: Form[]
  height: number
  held_items: any[]
  id: number
  is_default: boolean
  location_area_encounters: string
  moves: Mfe[]
  name: string
  order: number
  past_types: any[]
  sprites: Sprites
  types: Type[]
  weight: number
}

export interface Pokemon {
  name: string
  url: string
}

export interface Sprites {
  back_default: string | null
  back_female: string | null
  back_shiny: string | null
  back_shiny_female: string | null
  front_default: string | null
  front_female: string | null
  front_shiny: string | null
  front_shiny_female: string | null
}

export interface Type {
  slot: number
  type: TypeDetail
}

export interface TypeDetail {
  name: string
  url: string
}

export interface Form {
  name: string
  url: string
}

export interface Mfe {
  move: Move
}

export interface Move {
  name: string
  url: string
}

export interface Option {
  label: string
  value: string
}

export interface Species {
  name: string
  url: string
}

export interface CustomSpecies {
  name: string
  id: string
}

export interface IEvolutionAPIResponse {
  baby_trigger_item: any
  chain: Chain
  id: number
}

export interface Chain {
  evolution_details: any[]
  evolves_to: EvolvesTo[]
  is_baby: boolean
  species: Species
}

export interface EvolvesTo {
  evolves_to: EvolvesTo[]
  is_baby: boolean
  species: Species
}