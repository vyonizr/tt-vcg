import { useState, useEffect, useCallback, useRef } from 'react'
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import Link from 'next/link'

import { POKEMON_LIST_URL } from '@/APIEndpoints'
import { IPokemonAPIResponse, Pokemon } from '@/types'
import { getPokemonId } from '@/utils'

const FETCH_SIZE = 8

export const getServerSideProps: GetServerSideProps<{
  pokemonAPI: IPokemonAPIResponse
}> = async () => {
  const res = await fetch(
    `${POKEMON_LIST_URL}?` + new URLSearchParams({ limit: '8', offset: '0' })
  )
  const pokemonAPI = await res.json()
  return { props: { pokemonAPI } }
}

export default function Home({
  pokemonAPI,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const observerTarget = useRef(null)
  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  const [offset, setOffset] = useState(0)
  // const [query, setQuery] = useState('')

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch(
        `${POKEMON_LIST_URL}?` +
          new URLSearchParams({
            limit: String(FETCH_SIZE),
            offset: String(offset),
          })
      )
      const pokemonAPI: IPokemonAPIResponse = await res.json()
      setPokemons([...pokemons, ...pokemonAPI.results])
      setOffset((prevState) => prevState + FETCH_SIZE)
    } catch (error) {
      console.error(error)
    }
  }, [offset, pokemons])

  useEffect(() => {
    if (pokemons.length === 0) {
      fetchData()
    }
  }, [fetchData, pokemons.length])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchData()
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
  }, [observerTarget, fetchData])

  return (
    <>
      <ul className='grid grid-cols-2 gap-2 w-[300px]'>
        {pokemons.map((pokemon) => (
          <li
            key={pokemon.name}
            className='bg-slate-200 rounded lg:hover:bg-slate-600 lg:hover:text-white'
          >
            <Link
              href={getPokemonId(pokemon.url)}
              className='p-2 block text-center'
            >
              {pokemon.name}
            </Link>
          </li>
        ))}
      </ul>
      <div ref={observerTarget}></div>
    </>
  )
}
