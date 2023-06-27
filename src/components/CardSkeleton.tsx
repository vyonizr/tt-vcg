const SKELETON_ARRAY = Array.from(Array(8), (_, index) => index)

export default function CardSkeleton() {
  return (
    <ul className="my-2 grid w-[300px] grid-cols-2 gap-2">
      {SKELETON_ARRAY.map((number) => (
        <li
          key={number}
          className="w-full animate-pulse rounded bg-slate-200 p-2"
        >
          <p className="h-6 bg-slate-300" />
        </li>
      ))}
    </ul>
  );
}
