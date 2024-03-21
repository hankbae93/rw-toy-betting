import { render } from '@redwoodjs/testing/web'

import BetListPage from './BetListPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('BetListPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<BetListPage />)
    }).not.toThrow()
  })
})
