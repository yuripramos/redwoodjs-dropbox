import { render, screen } from '@redwoodjs/testing/web'

import Header from './Header'

describe('Footer', () => {
  it('renders the Header component successfully', () => {
    render(<Header />)

    // Check if the footer element is present
    const headerElement = screen.getByRole('heading')
    expect(headerElement).toBeInTheDocument()

    const titleMessage = screen.getByText(`Upload your file`)
    expect(titleMessage).toBeInTheDocument()
  })
})
