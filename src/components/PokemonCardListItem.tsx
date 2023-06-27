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
    <li className="rounded bg-slate-200 lg:hover:bg-slate-600 lg:hover:text-white">
      <Link
        href={getPokemonId(pokemon.url)}
        className="block p-2 text-center lg:hover:text-white"
      >
        {convertToTitleCase(pokemon.name)}
      </Link>
    </li>
  );
}
