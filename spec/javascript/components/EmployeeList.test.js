import React from 'react'
import { act, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import EmployeeList from 'components/EmployeeList'

const buildPagy = (overrides = {}) => ({
  page: 1,
  last: 2,
  prev: null,
  next: 2,
  from: 1,
  to: 1,
  count: 2,
  ...overrides
})

describe('EmployeeList', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: async () => ({
        employees: [],
        pagy: buildPagy({ page: 2, prev: 1, next: null, from: 0, to: 0, count: 0 })
      })
    })

    window.history.pushState = jest.fn()
  })

  it('renders rows for employees', () => {
    render(
      <EmployeeList
        employees={[
          { id: 1, full_name: 'Alice Walker', job_title: 'HR Specialist', country: 'UK', salary: 55000 },
          { id: 2, full_name: 'Bob Smith', job_title: 'Developer', country: 'USA', salary: 120000 }
        ]}
        pagy={buildPagy({ last: 1 })}
        query=""
      />
    )

    expect(screen.getByRole('heading', { name: 'Employees' })).toBeInTheDocument()
    expect(screen.getByText('Alice Walker')).toBeInTheDocument()
    expect(screen.getByText('Bob Smith')).toBeInTheDocument()
  })

  it('fetches the next page when clicking Next', async () => {
    const user = userEvent.setup()

    render(<EmployeeList employees={[]} pagy={buildPagy()} query="" />)

    await user.click(screen.getByRole('link', { name: 'Next' }))

    await waitFor(() => expect(global.fetch).toHaveBeenCalled())
    const url = global.fetch.mock.calls[0][0].toString()
    expect(url).toContain('page=2')
  })

  it('fetches when searching', async () => {
    jest.useFakeTimers()
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })

    render(<EmployeeList employees={[]} pagy={buildPagy()} query="" />)

    await user.type(screen.getByPlaceholderText('Live search by name, title or country...'), 'Ali')
    await act(async () => {
      jest.advanceTimersByTime(350)
    })

    await waitFor(() => expect(global.fetch).toHaveBeenCalled())
    const url = global.fetch.mock.calls[0][0].toString()
    expect(url).toContain('query=Ali')

    jest.useRealTimers()
  })
})
