// import { useState } from 'react'
import { Inter } from 'next/font/google'
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import Link from 'next/link'

import { POKEMON_LIST_URL } from '@/APIEndpoints'
import { IPokemonAPIResponse } from '@/types'
import { getPokemonId } from '@/utils'

const inter = Inter({ subsets: ['latin'] })

export const getServerSideProps: GetServerSideProps<{
  pokemonAPI: IPokemonAPIResponse
}> = async () => {
  const res = await fetch(
    `${POKEMON_LIST_URL}?` + new URLSearchParams({ limit: '8', offset: '0' })
  )
  const pokemonAPI = await res.json()
  console.log(pokemonAPI)
  console.log(getPokemonId(pokemonAPI.results[0].url))
  return { props: { pokemonAPI } }
}

export default function Home({
  pokemonAPI,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  // const [offset, setOffset] = useState(0)
  // const [query, setQuery] = useState('')

  return (
    <>
      <ul className='grid grid-cols-2 gap-2'>
        {pokemonAPI.results.map((pokemon) => (
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
    </>
  )
}
