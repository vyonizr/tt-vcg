export default function PokemonDetailTableSkeleton() {
  return (
    <table className='w-[280px] animate-pulse'>
      <tbody>
        <tr>
          <th colSpan={2}>
            <div className='bg-gray-300 w-full h-7' />
          </th>
        </tr>
        <tr>
          <td colSpan={2} className='pb-4'>
            <div className='flex flex-col items-center'>
              <div className='bg-gray-300 w-[96px] h-[96px]' />
              <div className='bg-gray-300 w-[120px] h-6 mt-2' />
            </div>
          </td>
        </tr>
        <tr>
          <td className='px-2'>
            <div className='bg-gray-300 w-4/6 h-6' />
          </td>
          <td className='px-2'>
            <div className='bg-gray-300 w-full h-6' />
          </td>
        </tr>
        <tr>
          <td className='px-2'>
            <div className='bg-gray-300 w-4/6 h-6' />
          </td>
          <td className='px-2'>
            <div className='bg-gray-300 w-full h-6' />
          </td>
        </tr>
        <tr>
          <td className='px-2'>
            <div className='bg-gray-300 w-4/6 h-6' />
          </td>
          <td className='px-2'>
            <div>
              <div className='bg-gray-300 w-full h-6' />
              <div className='bg-gray-300 w-full h-6 my-2' />
              <div className='bg-gray-300 w-full h-6' />
            </div>
          </td>
        </tr>
        <tr>
          <td className='px-2'>
            <div className='bg-gray-300 w-4/6 h-6' />
          </td>
          <td className='px-2'>
            <div>
              <div className='bg-gray-300 w-full h-6' />
              <div className='bg-gray-300 w-full h-6 my-2' />
              <div className='bg-gray-300 w-full h-6' />
            </div>
          </td>
        </tr>
        <tr>
          <td className='px-2'>
            <div className='bg-gray-300 w-4/6 h-6' />
          </td>
          <td className='px-2'>
            <div>
              <div className='bg-gray-300 w-full h-6' />
              <div className='bg-gray-300 w-full h-6 my-2' />
              <div className='bg-gray-300 w-full h-6' />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  )
}
