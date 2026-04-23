import React from 'react'

const EmployeeDetail = ({ employee, notice, authenticity_token }) => {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
  }

  return (
    <div className="max-w-3xl mx-auto">
      {notice && (
        <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-md shadow-sm animate-fade-in">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800">{notice}</p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white shadow-2xl rounded-3xl overflow-hidden border border-gray-100">
        <div className="bg-gradient-to-br from-gray-900 to-blue-900 px-8 py-12 text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-blue-500/20 border-2 border-blue-400/30 mb-6 backdrop-blur-sm">
            <span className="text-4xl font-black text-white">
              {employee.full_name.split(' ').map(n => n[0]).join('').toUpperCase()}
            </span>
          </div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight">{employee.full_name}</h1>
          <p className="mt-2 text-blue-200 font-medium tracking-wide uppercase text-sm">{employee.job_title}</p>
        </div>

        <div className="px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-1">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Location</p>
              <div className="flex items-center text-gray-900 font-semibold">
                <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                {employee.country}
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Annual Salary</p>
              <div className="flex items-center text-gray-900 font-extrabold text-xl">
                <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {formatCurrency(employee.salary)}
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Email Address</p>
              <div className="flex items-center text-gray-900 font-semibold">
                <svg className="w-5 h-5 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                {employee.email}
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Hire Date</p>
              <div className="flex items-center text-gray-900 font-semibold">
                <svg className="w-5 h-5 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                {new Date(employee.hire_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-100 flex flex-wrap gap-4 items-center justify-between">
            <div className="flex space-x-3">
              <a 
                href={`/employees/${employee.id}/edit`} 
                className="inline-flex items-center px-6 py-3 rounded-xl bg-blue-600 text-white text-sm font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 hover:shadow-blue-300 transition-all active:scale-95"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                Edit Profile
              </a>
              <form action={`/employees/${employee.id}`} method="post" onSubmit={(e) => { if(!confirm('Are you sure you want to delete this employee?')) e.preventDefault(); }}>
                <input type="hidden" name="authenticity_token" value={authenticity_token} />
                <input type="hidden" name="_method" value="delete" />
                <button 
                  type="submit"
                  className="inline-flex items-center px-6 py-3 rounded-xl border border-red-200 text-red-600 text-sm font-bold hover:bg-red-50 hover:border-red-300 transition-all active:scale-95"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  Delete
                </button>
              </form>
            </div>
            <a 
              href="/employees" 
              className="text-sm font-bold text-gray-400 hover:text-gray-600 flex items-center transition"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
              Back to Employee List
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmployeeDetail
