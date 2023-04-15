import { render, screen } from '@redwoodjs/testing/web'

import Footer from './Footer'

describe('Footer', () => {
  it('renders the Footer component successfully', () => {
    render(<Footer />)

    // Check if the footer element is present
    const footerElement = screen.getByRole('contentinfo')
    expect(footerElement).toBeInTheDocument()

    // Check if the copyright message is present and contains the correct year
    const currentYear = new Date().getFullYear()
    const copyrightMessage = screen.getByText(
      `© ${currentYear} Yuri Ramos 🧑🏾‍💻. All rights reserved.`
    )
    expect(copyrightMessage).toBeInTheDocument()
  })
})
