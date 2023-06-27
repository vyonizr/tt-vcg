import { getPokemonId, convertToTitleCase, modulo } from '@/utils'

describe('Utils', () => {
  test('getPokemonId', () => {
    expect(getPokemonId('https://pokeapi.co/api/v2/pokemon/1/')).toBe('1')
    expect(getPokemonId('https://pokeapi.co/api/v2/pokemon/25/')).toBe('25')
    expect(getPokemonId('https://pokeapi.co/api/v2/pokemon/100/')).toBe('100')
    expect(getPokemonId('https://pokeapi.co/api/v2/pokemon/1000/')).toBe('1000')
  })

  test('convertToTitleCase', () => {
    expect(convertToTitleCase('bulbasaur')).toBe('Bulbasaur')
    expect(convertToTitleCase('ivysaur')).toBe('Ivysaur')
    expect(convertToTitleCase('venusaur')).toBe('Venusaur')
    expect(convertToTitleCase('charmander')).toBe('Charmander')
    expect(convertToTitleCase('charmeleon')).toBe('Charmeleon')
    expect(convertToTitleCase('charizard')).toBe('Charizard')
    expect(convertToTitleCase('squirtle')).toBe('Squirtle')
    expect(convertToTitleCase('wartortle')).toBe('Wartortle')
    expect(convertToTitleCase('blastoise')).toBe('Blastoise')
    expect(convertToTitleCase('pikachu')).toBe('Pikachu')

    expect(convertToTitleCase('razor-wind')).toBe('Razor Wind')
    expect(convertToTitleCase('swords-dance')).toBe('Swords Dance')
    expect(convertToTitleCase('solar-beam')).toBe('Solar Beam')
    expect(convertToTitleCase('thunder-punch')).toBe('Thunder Punch')
    expect(convertToTitleCase('fire-punch')).toBe('Fire Punch')
  })

  test('modulo', () => {
    expect(modulo(-1, 3)).toBe(2)
    expect(modulo(0, 3)).toBe(0)
    expect(modulo(1, 3)).toBe(1)
    expect(modulo(2, 3)).toBe(2)
    expect(modulo(3, 3)).toBe(0)
  })
})
