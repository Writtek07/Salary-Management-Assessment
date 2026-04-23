import React, { useState, useEffect, useCallback } from 'react'
import Pagination from './Pagination'
import SearchBar from './SearchBar'

const EmployeeList = ({ employees: initialEmployees, pagy: initialPagy, query: initialQuery }) => {
  const [employees, setEmployees] = useState(initialEmployees)
  const [pagy, setPagy] = useState(initialPagy)
  const [query, setQuery] = useState(initialQuery || '')
  const [loading, setLoading] = useState(false)

  const fetchData = useCallback(async (searchQuery, page = 1) => {
    setLoading(true)
    const url = new URL('/employees.json', window.location.origin)
    if (searchQuery) url.searchParams.set('query', searchQuery)
    if (page > 1) url.searchParams.set('page', page)

    try {
      const response = await fetch(url)
      const data = await response.json()
      setEmployees(data.employees)
      setPagy(data.pagy)

      // Update URL without reload
      const displayUrl = new URL('/employees', window.location.origin)
      if (searchQuery) displayUrl.searchParams.set('query', searchQuery)
      if (page > 1) displayUrl.searchParams.set('page', page)
      window.history.pushState({}, '', displayUrl.toString())
    } catch (error) {
      console.error('Error fetching employees:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  const handleSearch = (newQuery) => {
    setQuery(newQuery)
    fetchData(newQuery, 1)
  }

  const handlePageChange = (newPage) => {
    fetchData(query, newPage)
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-bold text-4xl">Employees</h1>
        <a href="/employees/new" className="rounded-lg py-3 px-5 bg-blue-600 text-white font-medium">New employee</a>
      </div>

      <SearchBar initialQuery={query} onSearch={handleSearch} />

      <div className={`bg-white shadow rounded-lg overflow-hidden transition-opacity ${loading ? 'opacity-50' : 'opacity-100'}`}>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salary</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {employees.length > 0 ? (
              employees.map((employee) => (
                <tr key={employee.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{employee.full_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.job_title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.country}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(employee.salary)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <a href={`/employees/${employee.id}`} className="text-blue-600 hover:text-blue-900 mr-4">Show</a>
                    <a href={`/employees/${employee.id}/edit`} className="text-indigo-600 hover:text-indigo-900">Edit</a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-10 text-center text-gray-500">
                  No employees found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Pagination pagy={pagy} onPageChange={handlePageChange} />
    </div>
  )
}

export default EmployeeList
