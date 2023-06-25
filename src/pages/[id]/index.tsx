import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { getPokemonDetailURL } from '@/APIEndpoints'
import { IPokemonDetailAPIResponse } from '@/types'

import PokemonDetailTableSkeleton from '@/components/PokemonDetailTableSkeleton'
import PokemonDetailTable from '@/components/PokemonDetailTable'

export default function PokemonDetail() {
  const route = useRouter()
  const { id } = route.query

  const [pokemonDetail, setPokemonDetail] =
    useState<IPokemonDetailAPIResponse | null>(null)
  const [isDetailLoading, setIsDetailLoading] = useState(false)
  const [isDetailError, setIsDetailError] = useState(false)

  useEffect(() => {
    async function fetchPokemonDetail(pokemonId: string) {
      try {
        setIsDetailLoading(true)
        const res = await fetch(getPokemonDetailURL(pokemonId))
        const pokemonDetail = await res.json()
        setPokemonDetail(pokemonDetail)
      } catch (error) {
        console.error(error)
        setIsDetailError(true)
      } finally {
        // intentionally created to simulate loading
        setTimeout(() => {
          setIsDetailLoading(false)
        }, 1000)
      }
    }

    if (id !== undefined && typeof id === 'string') {
      fetchPokemonDetail(id)
    }
  }, [id])

  return (
    <>
      <Link href='/'>← Back to Home</Link>
      {isDetailError ? (
        <div className='text-center'>
          <h1 className='text-4xl'>An error occured</h1>
        </div>
      ) : isDetailLoading ? (
        <PokemonDetailTableSkeleton />
      ) : (
        <PokemonDetailTable pokemon={pokemonDetail} />
      )}
    </>
  )
}
