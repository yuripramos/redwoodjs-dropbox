import { render, screen, MockProviders } from '@redwoodjs/testing/web'

import DragAndDropUpload from './DragAndDropFile'

describe('DragAndDropUpload', () => {
  it('renders the DragAndDropUpload component successfully', () => {
    render(<DragAndDropUpload />)
    expect(screen.getByTestId('drag-and-drop-file')).toBeInTheDocument()
  })

  it('renders without errors', () => {
    render(
      <MockProviders>
        <DragAndDropUpload />
      </MockProviders>
    )
    expect(screen.getByTestId('drag-and-drop-file')).toBeInTheDocument()
  })
})
