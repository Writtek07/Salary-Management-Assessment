import React from 'react'

const Insights = ({ total_employees, total_payroll, global_avg_salary, salary_by_country, avg_salary_by_job_title_and_country, global_avg_by_job_title }) => {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      maximumFractionDigits: 0 
    }).format(value)
  }

  return (
    <div className="w-full space-y-8 pb-12">
      <div className="flex justify-between items-end border-b pb-6">
        <div>
          <h1 className="font-extrabold text-4xl text-gray-900 tracking-tight">Salary Insights</h1>
          <p className="mt-2 text-lg text-gray-500">Comprehensive overview of compensation across your organization.</p>
        </div>
        <a href="/employees" className="hidden sm:flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition shadow-sm">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Back to Employees
        </a>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center space-x-4">
          <div className="p-3 bg-blue-50 rounded-xl">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Total Talent</p>
            <p className="text-3xl font-bold text-gray-900">{total_employees.toLocaleString()}</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center space-x-4">
          <div className="p-3 bg-green-50 rounded-xl">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Annual Payroll</p>
            <p className="text-3xl font-bold text-gray-900">{formatCurrency(total_payroll)}</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center space-x-4">
          <div className="p-3 bg-purple-50 rounded-xl">
            <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Global Average</p>
            <p className="text-3xl font-bold text-gray-900">{formatCurrency(global_avg_salary)}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Metrics by Country */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 bg-gray-50 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 flex items-center">
              <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2h2.945M8 3.935A9 9 0 1116.065 19.935" /></svg>
              Regional Benchmarks
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Country</th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Range (Min/Max)</th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Average</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {Object.entries(salary_by_country).map(([country, metrics]) => (
                  <tr key={country} className="hover:bg-gray-50/50 transition">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{country}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                      <div className="flex flex-col items-end">
                        <span className="text-xs text-gray-400">Min: {formatCurrency(metrics.min)}</span>
                        <span className="text-xs text-gray-400">Max: {formatCurrency(metrics.max)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-extrabold text-blue-600">{formatCurrency(metrics.avg)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Global Average by Job Title */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 bg-gray-50 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 flex items-center">
              <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              Role Distribution
            </h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.entries(global_avg_by_job_title).map(([title, avg]) => (
                <div key={title} className="p-4 rounded-xl border border-gray-50 bg-gray-50/50 hover:bg-white hover:shadow-md hover:border-blue-100 transition group">
                  <p className="text-xs text-gray-400 uppercase font-bold tracking-widest group-hover:text-blue-500 transition">{title}</p>
                  <p className="mt-1 text-xl font-extrabold text-gray-900">{formatCurrency(avg)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Average Salary by Job Title in Country */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden lg:col-span-2">
          <div className="p-6 bg-gray-50 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 flex items-center">
              <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
              Detailed Breakdown (Country & Role)
            </h2>
          </div>
          <div className="p-6">
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
              {Object.entries(avg_salary_by_job_title_and_country).map(([country, jobs]) => (
                <div key={country} className="break-inside-avoid bg-white rounded-xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition">
                  <h3 className="flex items-center text-sm font-black text-blue-700 uppercase tracking-widest mb-4 border-b border-blue-50 pb-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    {country}
                  </h3>
                  <ul className="space-y-3">
                    {Object.entries(jobs).map(([title, avg]) => (
                      <li key={title} className="flex justify-between items-center text-sm">
                        <span className="text-gray-600 font-medium">{title}</span>
                        <span className="text-gray-900 font-bold bg-gray-100 px-2 py-0.5 rounded text-xs">{formatCurrency(avg)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center sm:hidden">
        <a href="/employees" className="w-full flex justify-center items-center px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm font-bold text-gray-700 shadow-sm">
          Back to Employees
        </a>
      </div>
    </div>
  )
}

export default Insights
