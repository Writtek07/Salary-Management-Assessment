import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Pagination from 'components/Pagination'

describe('Pagination', () => {
  it('renders nothing when there is only one page', () => {
    const { container } = render(
      <Pagination pagy={{ page: 1, last: 1, prev: null, next: null, from: 1, to: 1, count: 1 }} onPageChange={jest.fn()} />
    )
    expect(container.firstChild).toBeNull()
  })

  it('calls onPageChange when clicking Next', async () => {
    const user = userEvent.setup()
    const onPageChange = jest.fn()

    render(
      <Pagination
        pagy={{ page: 2, last: 4, prev: 1, next: 3, from: 11, to: 20, count: 40 }}
        onPageChange={onPageChange}
      />
    )

    await user.click(screen.getByRole('link', { name: 'Next' }))
    expect(onPageChange).toHaveBeenCalledWith(3)
  })

  it('calls onPageChange when clicking a page number', async () => {
    const user = userEvent.setup()
    const onPageChange = jest.fn()

    render(
      <Pagination
        pagy={{ page: 2, last: 5, prev: 1, next: 3, from: 11, to: 20, count: 50 }}
        onPageChange={onPageChange}
      />
    )

    await user.click(screen.getByRole('link', { name: '4' }))
    expect(onPageChange).toHaveBeenCalledWith(4)
  })
})
