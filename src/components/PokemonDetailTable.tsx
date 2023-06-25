import { useState, useEffect, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  IPokemonDetailAPIResponse,
  Sprites,
  Option,
  IEvolutionAPIResponse,
  CustomSpecies,
} from '@/types'
import { getPokemonEvoChainURL } from '@/APIEndpoints'
import { extractEvolutions, convertToTitleCase, modulo } from '@/utils'
import { ERROR_MESSAGE } from '@/constants'

interface PokemonDetailProps {
  pokemon: IPokemonDetailAPIResponse | null
}

enum NAVIGATION {
  NEXT = 'NEXT',
  PREVIOUS = 'PREVIOUS',
}

export default function PokemonDetailTable({ pokemon }: PokemonDetailProps) {
  const route = useRouter()
  const { id } = route.query
  const [evolutions, setEvolutions] = useState<CustomSpecies[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    async function fetchEvolutions(pokemonId: string) {
      try {
        setIsLoading(true)
        const response = await fetch(getPokemonEvoChainURL(pokemonId))
        if (response.status === 404) {
          throw new Error(ERROR_MESSAGE.NOT_FOUND)
        }
        const responseJSON: IEvolutionAPIResponse = await response.json()

        const evolutionList: CustomSpecies[] = []
        extractEvolutions(responseJSON.chain, evolutionList)
        setEvolutions(evolutionList)
      } catch (error) {
        if (
          error instanceof Error &&
          error.message === ERROR_MESSAGE.NOT_FOUND
        ) {
          setEvolutions([])
        } else {
          console.error(error)
          setError(true)
        }
      } finally {
        setIsLoading(false)
      }
    }

    if (typeof id === 'string') {
      fetchEvolutions(String(id))
    }
  }, [id])

  const generateSpriteLabels = (propertyName: keyof Sprites) => {
    switch (propertyName) {
      case 'back_default':
        return 'Back (Male)'
      case 'back_female':
        return 'Back (Female)'
      case 'back_shiny':
        return 'Back Shiny (Male)'
      case 'back_shiny_female':
        return 'Back Shiny (Female)'
      case 'front_default':
        return 'Front (Male)'
      case 'front_female':
        return 'Front (Female)'
      case 'front_shiny':
        return 'Front Shiny (Male)'
      case 'front_shiny_female':
        return 'Front Shiny (Female)'
      default:
        return null
    }
  }

  const viewSpritesOptions = useMemo(() => {
    const options: Option[] = []
    if (pokemon && pokemon.sprites) {
      Object.keys(pokemon.sprites).forEach((spriteKey) => {
        if (pokemon.sprites[spriteKey as keyof Sprites] !== null) {
          const spriteLabel = generateSpriteLabels(spriteKey as keyof Sprites)

          if (spriteLabel !== null) {
            options.push({
              label: spriteLabel,
              value: pokemon.sprites[spriteKey as keyof Sprites] || '',
            })
          }
        }
      })
    }

    return options
  }, [pokemon])

  const [selectedSpriteIndex, setSelectedSpriteIndex] = useState(0)

  const handleCycleSprite = (direction: NAVIGATION) => {
    setSelectedSpriteIndex((prevIndex) =>
      direction === NAVIGATION.NEXT
        ? modulo(prevIndex + 1, viewSpritesOptions.length)
        : modulo(prevIndex - 1, viewSpritesOptions.length)
    )
  }

  return (
    <>
      {pokemon !== null ? (
        <table className='w-[280px]'>
          <tbody>
            <tr>
              <th colSpan={2}>
                <h1 className='text-xl'>{convertToTitleCase(pokemon.name)}</h1>
              </th>
            </tr>
            <tr>
              <td colSpan={2} className='pb-4'>
                <div className='grid grid-cols-[2rem_1fr_2rem]'>
                  <button
                    onClick={() => handleCycleSprite(NAVIGATION.PREVIOUS)}
                  >
                    {'<'}
                  </button>
                  <div className='flex flex-col items-center'>
                    {viewSpritesOptions[selectedSpriteIndex] &&
                    viewSpritesOptions[selectedSpriteIndex].value ? (
                      <Image
                        src={viewSpritesOptions[selectedSpriteIndex].value}
                        alt={pokemon.name}
                        width={96}
                        height={96}
                      />
                    ) : null}
                    <p>{viewSpritesOptions[selectedSpriteIndex].label}</p>
                  </div>
                  <button onClick={() => handleCycleSprite(NAVIGATION.NEXT)}>
                    {'>'}
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <td>Height</td>
              <td>{pokemon.height / 10} m</td>
            </tr>
            <tr>
              <td>Weight</td>
              <td>{pokemon.weight / 10} kg</td>
            </tr>
            <tr>
              <td>Types</td>
              <td>
                <ul>
                  {pokemon.types.map((type) => (
                    <li
                      key={type.type.name}
                      className={evolutions.length > 1 ? 'list-disc' : ''}
                    >
                      {convertToTitleCase(type.type.name)}
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
            <tr>
              <td>Evolution</td>
              <td>
                {isLoading ? (
                  <p>Loading...</p>
                ) : error ? (
                  <p>Error</p>
                ) : (
                  <>
                    {evolutions.length > 0 ? (
                      <ol className='list-inside'>
                        {evolutions.map((species, index) => (
                          <li
                            className={
                              evolutions.length > 1 ? 'list-decimal' : ''
                            }
                            key={index}
                          >
                            <Link href={`/${species.id}`}>{species.name}</Link>
                          </li>
                        ))}
                      </ol>
                    ) : (
                      <p>-</p>
                    )}
                  </>
                )}
              </td>
            </tr>
            <tr>
              <td>Moves</td>
              <td>
                <ul>
                  {pokemon.moves.slice(0, 9).map((move) => (
                    <li
                      className={pokemon.moves.length > 1 ? 'list-disc' : ''}
                      key={move.move.name}
                    >
                      {move.move.name}
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      ) : null}
    </>
  )
}
