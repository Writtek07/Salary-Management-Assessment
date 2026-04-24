import React from 'react'
import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SearchBar from 'components/SearchBar'

describe('SearchBar', () => {
  it('debounces calls to onSearch while typing', async () => {
    jest.useFakeTimers()
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    const onSearch = jest.fn()

    render(<SearchBar initialQuery="" onSearch={onSearch} />)

    await user.type(screen.getByPlaceholderText('Live search by name, title or country...'), 'Uni')
    expect(onSearch).not.toHaveBeenCalled()

    await act(async () => {
      jest.advanceTimersByTime(350)
    })
    expect(onSearch).toHaveBeenCalledWith('Uni')

    jest.useRealTimers()
  })

  it('clears the input and triggers an empty search', async () => {
    jest.useFakeTimers()
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    const onSearch = jest.fn()

    const { container } = render(<SearchBar initialQuery="" onSearch={onSearch} />)

    const input = screen.getByPlaceholderText('Live search by name, title or country...')
    await user.type(input, 'Hello')
    await act(async () => {
      jest.advanceTimersByTime(350)
    })

    const clearButton = container.querySelector('button')
    await user.click(clearButton)

    expect(input).toHaveValue('')
    expect(onSearch).toHaveBeenCalledTimes(2)
    expect(onSearch).toHaveBeenLastCalledWith('')

    jest.useRealTimers()
  })
})
