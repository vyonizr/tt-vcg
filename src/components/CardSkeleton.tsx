const SKELETON_ARRAY = Array.from(Array(8), (_, index) => index)

export default function CardSkeleton() {
  return (
    <ul className='grid grid-cols-2 gap-2 w-[300px]'>
      {SKELETON_ARRAY.map((number) => (
        <li
          key={number}
          className='bg-slate-200 rounded w-full p-2 animate-pulse'
        >
          <p className='bg-slate-300 h-6' />
        </li>
      ))}
    </ul>
  )
}
