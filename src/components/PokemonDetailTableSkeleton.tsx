export default function PokemonDetailTableSkeleton() {
  return (
    <table className="w-[280px] animate-pulse">
      <tbody>
        <tr>
          <th colSpan={2}>
            <div className="h-7 w-full bg-gray-300" />
          </th>
        </tr>
        <tr>
          <td colSpan={2} className="pb-4">
            <div className="flex flex-col items-center">
              <div className="h-[96px] w-[96px] bg-gray-300" />
              <div className="mt-2 h-6 w-[120px] bg-gray-300" />
            </div>
          </td>
        </tr>
        <tr>
          <td className="px-2">
            <div className="h-6 w-4/6 bg-gray-300" />
          </td>
          <td className="px-2">
            <div className="h-6 w-full bg-gray-300" />
          </td>
        </tr>
        <tr>
          <td className="px-2">
            <div className="h-6 w-4/6 bg-gray-300" />
          </td>
          <td className="px-2">
            <div className="h-6 w-full bg-gray-300" />
          </td>
        </tr>
        <tr>
          <td className="px-2">
            <div className="h-6 w-4/6 bg-gray-300" />
          </td>
          <td className="px-2">
            <div>
              <div className="h-6 w-full bg-gray-300" />
              <div className="my-2 h-6 w-full bg-gray-300" />
              <div className="h-6 w-full bg-gray-300" />
            </div>
          </td>
        </tr>
        <tr>
          <td className="px-2">
            <div className="h-6 w-4/6 bg-gray-300" />
          </td>
          <td className="px-2">
            <div>
              <div className="h-6 w-full bg-gray-300" />
              <div className="my-2 h-6 w-full bg-gray-300" />
              <div className="h-6 w-full bg-gray-300" />
            </div>
          </td>
        </tr>
        <tr>
          <td className="px-2">
            <div className="h-6 w-4/6 bg-gray-300" />
          </td>
          <td className="px-2">
            <div>
              <div className="h-6 w-full bg-gray-300" />
              <div className="my-2 h-6 w-full bg-gray-300" />
              <div className="h-6 w-full bg-gray-300" />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
