
const TableSkeleton = () => {
  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full table-auto border-collapse rounded-md">
        <thead>
          <tr className="bg-muted text-left">
            <th className="p-4"></th>
            <th className="p-4"></th>
            <th className="p-4"></th>
            <th className="p-4"></th>
            <th className="p-4"></th>
            <th className="p-4"></th>
          </tr>
        </thead>
        <tbody>
          {[...Array(5)].map((_, i) => (
            <tr key={i} className="animate-pulse border-b">
              <td className="p-4">
                <div className="h-4 w-4 bg-gray-300 rounded-full"></div>
              </td>
              <td className="p-4">
                <div className="h-4 w-24 bg-gray-300 rounded"></div>
              </td>
              <td className="p-4">
                <div className="h-4 w-20 bg-gray-300 rounded"></div>
              </td>
              <td className="p-4">
                <div className="h-4 w-16 bg-gray-300 rounded"></div>
              </td>
              <td className="p-4">
                <div className="h-4 w-20 bg-gray-300 rounded"></div>
              </td>
              <td className="p-4">
                <div className="h-4 w-20 bg-gray-300 rounded"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TableSkeleton