import { atom } from 'recoil'
import { Pokemon } from '@/types'

export const pokemonState = atom({
  key: 'PokemonList',
  default: [] as Pokemon[],
})

export const queryState = atom({
  key: 'Query',
  default: '',
})

export const offsetState = atom({
  key: 'Offset',
  default: 0,
})
