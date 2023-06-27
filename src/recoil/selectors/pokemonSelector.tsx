import { selector } from 'recoil'
import { pokemonState, queryState } from '@/recoil/atoms/pokemonAtom'

export const filteredPokemonState = selector({
  key: 'FilteredPokemonList',
  get: ({ get }) => {
    const pokemonList = get(pokemonState)
    const query = get(queryState)

    if (query.length === 0) {
      return pokemonList
    }

    const searchRegex = new RegExp(query, "i");

    return pokemonList.filter((pokemon) => {
      return searchRegex.test(pokemon.name)
    })
  },
})
