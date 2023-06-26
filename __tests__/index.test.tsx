import { render, screen } from '@testing-library/react'
import { fireEvent } from '@testing-library/dom'
import { RecoilRoot } from 'recoil'
import RecoilObserver from '../src/components/RecoilObserver'
import { queryState } from '../src/recoil/atoms/pokemonAtom'
import Home from '../src/pages/index'
import '@testing-library/jest-dom'

describe('Home', () => {
  beforeEach(() => {
    // https://stackoverflow.com/a/62148101/11737199
    const mockIntersectionObserver = jest.fn()
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null,
    })
    window.IntersectionObserver = mockIntersectionObserver
  })

  test('search input is changed when the user enters a pokemon name.', () => {
    const onChange = jest.fn()

    render(
      <RecoilRoot>
        <RecoilObserver node={queryState} onChange={onChange} />
        <Home />
      </RecoilRoot>
    )

    const TEST_INPUT = 'bulbasaur'

    const component = screen.getByTestId('query_input')

    fireEvent.change(component, { target: { value: TEST_INPUT } })

    expect(onChange).toHaveBeenCalledTimes(2)
    expect(onChange).toHaveBeenCalledWith('') // Initial state on render.
    expect(onChange).toHaveBeenCalledWith(TEST_INPUT) // New value on change.
  })
})
