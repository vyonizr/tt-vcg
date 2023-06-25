import { atom } from 'recoil'

export const pokemonState = atom({
  key: 'PokemonList',
  default: [],
})

export const queryState = atom({
  key: 'Query',
  default: '',
})

export const offsetState = atom({
  key: 'Offset',
  default: 0,
})
