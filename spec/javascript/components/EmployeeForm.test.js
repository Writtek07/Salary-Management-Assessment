import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import EmployeeForm from 'components/EmployeeForm'

describe('EmployeeForm', () => {
  it('renders the new employee form and allows typing', async () => {
    const user = userEvent.setup()
    const { container } = render(<EmployeeForm employee={{}} errors={[]} authenticity_token="token" />)

    expect(screen.getByRole('heading', { name: 'Add New Employee' })).toBeInTheDocument()
    expect(container.querySelector('form')).toHaveAttribute('action', '/employees')
    expect(container.querySelector('input[name="_method"]')).toBeNull()

    const fullNameInput = screen.getByLabelText('Full Name')
    await user.type(fullNameInput, 'Jane Doe')
    expect(fullNameInput).toHaveValue('Jane Doe')
  })

  it('renders the edit employee form with PATCH method', () => {
    const employee = {
      id: 123,
      full_name: 'Jane Smith',
      job_title: 'Developer',
      country: 'USA',
      salary: 100000,
      email: 'jane@example.com',
      hire_date: '2026-01-01'
    }

    const { container } = render(<EmployeeForm employee={employee} errors={[]} authenticity_token="token" />)

    expect(screen.getByRole('heading', { name: 'Edit Employee' })).toBeInTheDocument()
    expect(container.querySelector('form')).toHaveAttribute('action', '/employees/123')
    expect(container.querySelector('input[name="_method"]')).toHaveAttribute('value', 'patch')
  })
})
