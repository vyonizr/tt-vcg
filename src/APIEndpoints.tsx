const POKEMON_BASE_URL = 'https://pokeapi.co/api/v2'
const POKEMON_LIST_URL = `${POKEMON_BASE_URL}/pokemon`
const POKEMON_EVO_CHAIN_URL = `${POKEMON_BASE_URL}/evolution-chain`

const getPokemonDetailURL = (id: string) => `${POKEMON_LIST_URL}/${id}`
const getPokemonEvoChainURL = (id: string) => `${POKEMON_EVO_CHAIN_URL}/${id}`

export {
  POKEMON_BASE_URL,
  POKEMON_LIST_URL,
  getPokemonDetailURL,
  getPokemonEvoChainURL,
}
