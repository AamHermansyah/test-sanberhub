import { Link } from "react-router-dom"

function Table({ headers, data, isLoading, onClickDeleteById, onEditClick }) {

  return (
    <div className="overflow-x-auto border border-emerald-400 rounded-xl">
      <table className="table table-zebra table-compact w-full">
        <thead>
          <tr className="bg-emerald-400">
            {headers.map((title, index) => (
              <th className="bg-transparent text-white" key={index}>
                {title}
              </th>
            ))}
          </tr>
        </thead>

        <tbody
          before-title={data?.length === 0 ? 'Data is empty' : 'Request is error'}
          className={`${data?.length === 0 ? 'table-body-empty' : ''} relative w-full`}
        >
          {isLoading && (data?.length === 0 || data === null) && (
            <tr>
              <th>0</th>
              {Array
                .from({ length: 5 })
                .map((fill, index) => <td key={index}>Loading</td>)}
              <td className="flex gap-2">
                <button
                  className="px-4 py-2 border border-emerald-400 rounded disabled:cursor-wait disabled:opacity-50"
                  disabled={isLoading}
                >
                  View
                </button>
                <button
                  className="px-4 py-2 border rounded bg-sky-500 text-white disabled:cursor-wait disabled:opacity-50"
                  disabled={isLoading}
                >
                  Edit
                </button>
                <button
                  className="px-4 py-2 border rounded bg-red-500 text-white disabled:cursor-wait disabled:opacity-50"
                  disabled={isLoading}
                >
                  Delete
                </button>
              </td>
            </tr>
          )}
          {!isLoading && data.map((user, index) => (
            <tr key={index}>
              {['id', 'name', 'address', 'gender', 'born_date', 'created_at']
                .map((key, index) => (
                  <th key={index}>
                    {user[key]}
                  </th>
                ))}
              <td className="flex gap-2">
                <Link
                  to={`/user/${user.id}`}
                  className="px-4 py-2 border border-emerald-400 rounded"
                >
                  View
                </Link>
                <button
                  onClick={() => onEditClick(user)}
                  className="px-4 py-2 border rounded bg-sky-500 text-white"
                >
                  Edit
                </button>

                <button
                  className="px-4 py-2 border rounded bg-red-500 text-white"
                  onClick={() => onClickDeleteById(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  )
}

export default Table