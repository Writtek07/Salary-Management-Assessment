import React from 'react'
import Pagination from './Pagination'

const EmployeeList = ({ employees, pagy }) => {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-bold text-4xl">Employees</h1>
        <a href="/employees/new" className="rounded-lg py-3 px-5 bg-blue-600 text-white font-medium">New employee</a>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
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
            {employees.map((employee) => (
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
            ))}
          </tbody>
        </table>
      </div>

      <Pagination pagy={pagy} />
    </div>
  )
}

export default EmployeeList
