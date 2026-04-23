import React from 'react'

const Pagination = ({ pagy }) => {
  const { page, last, prev, next, from, to, count } = pagy

  if (last <= 1) return null

  const getPageUrl = (p) => {
    const url = new URL(window.location.href)
    url.searchParams.set('page', p)
    return url.pathname + url.search
  }

  // Simple logic to generate page numbers
  const pages = []
  const range = 2
  for (let i = Math.max(1, page - range); i <= Math.min(last, page + range); i++) {
    pages.push(i)
  }

  return (
    <nav className="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-0 mt-8" aria-label="Pagination">
      <div className="hidden sm:block">
        <p className="text-sm text-gray-700">
          Showing <span className="font-medium">{from}</span> to <span className="font-medium">{to}</span> of <span className="font-medium">{count}</span> results
        </p>
      </div>
      <div className="flex flex-1 justify-between sm:justify-end items-center">
        {prev ? (
          <a
            href={getPageUrl(prev)}
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 mr-2"
          >
            Previous
          </a>
        ) : (
          <span className="relative inline-flex items-center rounded-md border border-gray-300 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-400 mr-2 cursor-not-allowed">
            Previous
          </span>
        )}

        <div className="hidden md:flex space-x-2">
          {pages[0] > 1 && (
            <>
              <a
                href={getPageUrl(1)}
                className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
              >
                1
              </a>
              {pages[0] > 2 && <span className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-400">...</span>}
            </>
          )}

          {pages.map((p) => (
            <a
              key={p}
              href={getPageUrl(p)}
              className={`inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium ${
                p === page
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              aria-current={p === page ? 'page' : undefined}
            >
              {p}
            </a>
          ))}

          {pages[pages.length - 1] < last && (
            <>
              {pages[pages.length - 1] < last - 1 && <span className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-400">...</span>}
              <a
                href={getPageUrl(last)}
                className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
              >
                {last}
              </a>
            </>
          )}
        </div>

        {next ? (
          <a
            href={getPageUrl(next)}
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 ml-2"
          >
            Next
          </a>
        ) : (
          <span className="relative inline-flex items-center rounded-md border border-gray-300 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-400 ml-2 cursor-not-allowed">
            Next
          </span>
        )}
      </div>
    </nav>
  )
}

export default Pagination
