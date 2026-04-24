import React from 'react'
import { render, screen } from '@testing-library/react'
import Insights from 'components/Insights'

describe('Insights', () => {
  it('renders key insights sections', () => {
    render(
      <Insights
        total_employees={42}
        total_payroll={4200000}
        global_avg_salary={100000}
        salary_by_country={{
          USA: { min: 80000, max: 150000, avg: 110000 },
          UK: { min: 60000, max: 120000, avg: 90000 }
        }}
        avg_salary_by_job_title_and_country={{
          USA: { Developer: 120000, Manager: 150000 },
          UK: { Developer: 95000 }
        }}
        global_avg_by_job_title={{
          Developer: 110000,
          Manager: 140000
        }}
      />
    )

    expect(screen.getByRole('heading', { name: 'Salary Insights' })).toBeInTheDocument()
    expect(screen.getByText('Total Talent')).toBeInTheDocument()
    expect(screen.getByText('Regional Benchmarks')).toBeInTheDocument()

    expect(screen.getAllByText('USA').length).toBeGreaterThan(0)
    expect(screen.getAllByText('UK').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Developer').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Manager').length).toBeGreaterThan(0)
    expect(screen.getAllByRole('link', { name: 'Back to Employees' })[0]).toHaveAttribute('href', '/employees')
  })
})
