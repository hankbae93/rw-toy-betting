import { render } from '@redwoodjs/testing/web'

import CreateBetPage from './CreateBetPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('CreateBetPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CreateBetPage />)
    }).not.toThrow()
  })
})
