import { render } from '@redwoodjs/testing/web'

import BetDetailPage from './BetDetailPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('BetDetailPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<BetDetailPage />)
    }).not.toThrow()
  })
})
