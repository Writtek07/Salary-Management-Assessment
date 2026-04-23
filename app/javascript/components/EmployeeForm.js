import React, { useState } from 'react'

const EmployeeForm = ({ employee = {}, errors = [], authenticity_token }) => {
  const [formData, setFormData] = useState({
    full_name: employee.full_name || '',
    job_title: employee.job_title || '',
    country: employee.country || '',
    salary: employee.salary || '',
    email: employee.email || '',
    hire_date: employee.hire_date || ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    // Extract field name from Rails-style "employee[field_name]"
    const fieldMatch = name.match(/employee\[(.*)\]/)
    const fieldName = fieldMatch ? fieldMatch[1] : name
    
    setFormData(prev => ({ ...prev, [fieldName]: value }))
  }

  const isNewRecord = !employee.id

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-10">
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            {isNewRecord ? 'Add New Employee' : 'Edit Employee'}
          </h1>
          <p className="mt-2 text-blue-100 opacity-90">
            {isNewRecord 
              ? 'Enter the details below to register a new member to the team.' 
              : `Updating information for ${employee.full_name}`}
          </p>
        </div>

        <form 
          action={isNewRecord ? "/employees" : `/employees/${employee.id}`} 
          method="post" 
          className="p-8 space-y-6"
        >
          <input type="hidden" name="authenticity_token" value={authenticity_token} />
          {!isNewRecord && <input type="hidden" name="_method" value="patch" />}

          {errors.length > 0 && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-bold text-red-800">
                    {errors.length} error{errors.length > 1 ? 's' : ''} prohibited this employee from being saved:
                  </h3>
                  <div className="mt-2 text-sm text-red-700">
                    <ul className="list-disc pl-5 space-y-1">
                      {errors.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-2">
              <label htmlFor="full_name" className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                name="employee[full_name]"
                id="full_name"
                value={formData.full_name}
                onChange={handleChange}
                className="block w-full px-4 py-3 rounded-xl border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition border"
                placeholder="e.g. John Doe"
                required
              />
            </div>

            <div>
              <label htmlFor="job_title" className="block text-sm font-semibold text-gray-700 mb-1">Job Title</label>
              <input
                type="text"
                name="employee[job_title]"
                id="job_title"
                value={formData.job_title}
                onChange={handleChange}
                className="block w-full px-4 py-3 rounded-xl border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition border"
                placeholder="e.g. Software Engineer"
                required
              />
            </div>

            <div>
              <label htmlFor="country" className="block text-sm font-semibold text-gray-700 mb-1">Country</label>
              <input
                type="text"
                name="employee[country]"
                id="country"
                value={formData.country}
                onChange={handleChange}
                className="block w-full px-4 py-3 rounded-xl border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition border"
                placeholder="e.g. United Kingdom"
                required
              />
            </div>

            <div>
              <label htmlFor="salary" className="block text-sm font-semibold text-gray-700 mb-1">Annual Salary (USD)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-gray-400 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  step="0.01"
                  name="employee[salary]"
                  id="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  className="block w-full pl-8 pr-4 py-3 rounded-xl border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition border"
                  placeholder="0.00"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="hire_date" className="block text-sm font-semibold text-gray-700 mb-1">Hire Date</label>
              <input
                type="date"
                name="employee[hire_date]"
                id="hire_date"
                value={formData.hire_date}
                onChange={handleChange}
                className="block w-full px-4 py-3 rounded-xl border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition border"
                required
              />
            </div>

            <div className="col-span-2">
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                name="employee[email]"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="block w-full px-4 py-3 rounded-xl border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition border"
                placeholder="john.doe@example.com"
                required
              />
            </div>
          </div>

          <div className="pt-6 flex items-center justify-end space-x-4 border-t border-gray-100 mt-8">
            <a 
              href="/employees" 
              className="px-6 py-3 rounded-xl text-sm font-bold text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition"
            >
              Cancel
            </a>
            <button
              type="submit"
              className="px-8 py-3 rounded-xl bg-blue-600 text-white text-sm font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 hover:shadow-blue-300 transform active:scale-95 transition-all"
            >
              {isNewRecord ? 'Create Employee' : 'Update Employee'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EmployeeForm
