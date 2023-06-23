// import { useState } from 'react'
import { Inter } from 'next/font/google'
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'

import { POKEMON_BASE_URL } from '@/constants'
import { IPokemonAPIResponse } from '@/types'

const inter = Inter({ subsets: ['latin'] })

export const getServerSideProps: GetServerSideProps<{
  pokemonAPI: IPokemonAPIResponse
}> = async () => {
  const res = await fetch(
    `${POKEMON_BASE_URL}?` + new URLSearchParams({ limit: '8', offset: '0' })
  )
  const pokemonAPI = await res.json()
  return { props: { pokemonAPI } }
}

export default function Home({
  pokemonAPI,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  // const [offset, setOffset] = useState(0)
  // const [query, setQuery] = useState('')

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className='grid grid-cols-2'>
        {pokemonAPI.results.map((pokemon) => (
          <div
            key={pokemon.name}
            className='flex flex-col items-center justify-center'
          >
            <h1 className=''>{pokemon.name}</h1>
          </div>
        ))}
      </div>
    </main>
  )
}
