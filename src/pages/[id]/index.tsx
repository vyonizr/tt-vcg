import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { getPokemonDetailURL } from '@/APIEndpoints'
import { ERROR_MESSAGE } from '@/constants'
import { IPokemonDetailAPIResponse } from '@/types'

import PokemonDetailTableSkeleton from '@/components/PokemonDetailTableSkeleton'
import PokemonDetailTable from '@/components/PokemonDetailTable'

export default function PokemonDetail() {
  const route = useRouter()
  const { id } = route.query

  const [pokemonDetail, setPokemonDetail] =
    useState<IPokemonDetailAPIResponse | null>(null)
  const [isDetailLoading, setIsDetailLoading] = useState(false)
  const [detailError, setDetailError] = useState<boolean | string>(false)

  useEffect(() => {
    async function fetchPokemonDetail(pokemonId: string) {
      try {
        setIsDetailLoading(true)
        const response = await fetch(getPokemonDetailURL(pokemonId))
        if (response.status === 404) {
          throw new Error(ERROR_MESSAGE.NOT_FOUND)
        }
        const pokemonDetail = await response.json()
        setPokemonDetail(pokemonDetail)
      } catch (error) {
        if (
          error instanceof Error &&
          error.message === ERROR_MESSAGE.NOT_FOUND
        ) {
          setDetailError(ERROR_MESSAGE.NOT_FOUND)
        } else {
          console.error(error)
          setDetailError(true)
        }
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
      {detailError ? (
        <div className='text-center'>
          <h1 className='text-4xl'>
            {detailError === ERROR_MESSAGE.NOT_FOUND
              ? `Pokemon #${id} is not found`
              : ERROR_MESSAGE.GENERAL}
          </h1>
        </div>
      ) : isDetailLoading ? (
        <PokemonDetailTableSkeleton />
      ) : (
        <PokemonDetailTable pokemon={pokemonDetail} />
      )}
    </>
  )
}
