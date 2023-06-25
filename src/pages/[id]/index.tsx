import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import Link from 'next/link'

import { IPokemonDetailAPIResponse } from '@/types'
import { getPokemonDetailURL } from '@/APIEndpoints'

const PokemonDetailTable = dynamic(
  () => import('@/components/PokemonDetailTable'),
  { suspense: true }
)

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
        setIsDetailLoading(false)
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
        <h1>Loading</h1>
      ) : (
        <PokemonDetailTable pokemon={pokemonDetail} />
      )}
    </>
  )
}
