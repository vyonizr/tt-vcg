import { useState, useEffect, useCallback, useRef } from 'react'
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil'
import Link from 'next/link'

import { POKEMON_LIST_URL } from '@/APIEndpoints'
import CardSkeleton from '@/components/CardSkeleton'
import {
  pokemonState,
  offsetState,
  queryState,
} from '@/recoil/atoms/pokemonAtom'
import { filteredPokemonState } from '@/recoil/selectors/pokemonSelector'
import { IPokemonAPIResponse } from '@/types'
import { getPokemonId } from '@/utils'

const FETCH_SIZE = 8

export default function Home() {
  const observerTarget = useRef(null)
  const pokemons = useRecoilValue(filteredPokemonState)
  const setPokemons = useSetRecoilState(pokemonState)

  const [query, setQuery] = useRecoilState(queryState)
  const [offset, setOffset] = useRecoilState(offsetState)

  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [maxPokemon, setMaxPokemon] = useState<number | null>(null)

  const fetchData = useCallback(
    async (offset: number) => {
      try {
        if (query.length === 0) {
          setIsLoading(true)
          const res = await fetch(
            `${POKEMON_LIST_URL}?` +
              new URLSearchParams({
                limit: String(FETCH_SIZE),
                offset: String(offset),
              })
          )
          const pokemonAPI: IPokemonAPIResponse = await res.json()
          if (maxPokemon !== pokemonAPI.count) {
            setMaxPokemon(pokemonAPI.count)
          }
          setPokemons([...pokemons, ...pokemonAPI.results])
          setOffset((prevState) => prevState + FETCH_SIZE)
        }
      } catch (error) {
        console.error(error)
        setIsError(true)
      } finally {
        // intentionally created to simulate loading
        setTimeout(() => {
          setIsLoading(false)
        }, 1000)
      }
    },
    [pokemons, maxPokemon, setOffset, setPokemons, query.length]
  )

  useEffect(() => {
    return () => {
      setQuery('')
    }
  }, [setQuery])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchData(offset)
        }
      },
      { threshold: 1 }
    )

    const currentObserverTarget = observerTarget.current

    if (currentObserverTarget) {
      observer.observe(currentObserverTarget)
    }

    return () => {
      if (currentObserverTarget) {
        observer.unobserve(currentObserverTarget)
      }
    }
  }, [observerTarget, fetchData, offset])

  return (
    <>
      <input
        type='text'
        placeholder='Search Pokemon'
        onChange={(e) => setQuery(e.target.value)}
        className='w-[300px] mb-4 bg-slate-100 border border-slate-400 rounded p-2'
      />
      {isError ? (
        <div className='text-center'>
          <h1 className='text-4xl'>An error occured</h1>
        </div>
      ) : (
        <>
          <ul className='grid grid-cols-2 gap-2 w-[300px]'>
            {pokemons.map((pokemon) => (
              <li
                key={pokemon.name}
                className='bg-slate-200 rounded lg:hover:bg-slate-600 lg:hover:text-white'
              >
                <Link
                  href={getPokemonId(pokemon.url)}
                  className='p-2 block text-center lg:hover:text-white'
                >
                  {pokemon.name}
                </Link>
              </li>
            ))}
            {isLoading ? <CardSkeleton /> : null}
            <li ref={observerTarget}></li>
          </ul>
        </>
      )}
    </>
  )
}
