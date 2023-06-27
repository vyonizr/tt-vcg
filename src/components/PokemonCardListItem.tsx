import Link from 'next/link'

import { Pokemon } from '@/types'
import { getPokemonId, convertToTitleCase } from '@/utils'

interface PokemonCardListItemProps {
  pokemon: Pokemon
}

export default function PokemonCardListItem({
  pokemon,
}: PokemonCardListItemProps) {
  return (
    <li className='bg-slate-200 rounded lg:hover:bg-slate-600 lg:hover:text-white'>
      <Link
        href={getPokemonId(pokemon.url)}
        className='p-2 block text-center lg:hover:text-white'
      >
        {convertToTitleCase(pokemon.name)}
      </Link>
    </li>
  )
}
