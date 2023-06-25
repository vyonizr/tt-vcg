import { Chain, CustomSpecies } from '@/types'

export function getPokemonId(url: string) {
  if (url) {
    const splitURL = url.split('/')
    return splitURL[splitURL.length - 2]
  }

  return ''
}

export function extractEvolutions(
  data: Omit<Chain, 'evolution_details'>,
  resultArray: CustomSpecies[]
) {
  if (data.evolves_to.length === 0) {
    return
  }

  for (const evolution of data.evolves_to) {
    resultArray.push({
      name: convertToTitleCase(evolution.species.name),
      id: getPokemonId(evolution.species.url),
    })

    extractEvolutions(evolution, resultArray)
  }
}

export function convertToTitleCase(str: string) {
  if (!str) return ''

  const words = str.toLowerCase().split(' ')

  const titleCaseWords = words.map((word) => {
    const firstLetter = word.charAt(0).toUpperCase()
    const restOfWord = word.slice(1)

    return firstLetter + restOfWord
  })

  return titleCaseWords.join(' ')
}

export function modulo(dividend: number, divisor: number) {
  return ((dividend % divisor) + divisor) % divisor
}
