import {
  render,
  screen,
  mockGraphQLQuery,
  waitFor,
} from '@redwoodjs/testing/web'

import HomePage from './HomePage'

describe('HomePage', () => {
  beforeEach(() => {
    mockGraphQLQuery('FindFiles', () => {
      return {
        files: [
          {
            id: 1,
            name: 'test-file-1.txt',
            path: 'https://example.com/test-file-1.txt',
            size: 1024,
            type: 'text/plain',
            createdAt: '2023-04-13T00:00:00.000Z',
          },
          {
            id: 2,
            name: 'new-file-2.txt',
            path: 'https://example.com/test-file-2.txt',
            size: 1048,
            type: 'text/plain',
            createdAt: '2023-04-14T00:00:00.000Z',
          },
        ],
      }
    })
  })

  it('renders the HomePage component successfully', async () => {
    render(<HomePage />)

    expect(
      screen.getByRole('heading', { name: /just drop your file below/i })
    ).toBeInTheDocument()

    expect(screen.getByTestId('drag-and-drop-file')).toBeInTheDocument()

    expect(
      screen.getByRole('heading', { name: /files uploaded/i })
    ).toBeInTheDocument()

    // Use waitFor to wait for the FilesCell component to be present after the GraphQL query resolves
    await waitFor(() => {
      expect(screen.getByTestId('files-cell')).toBeInTheDocument()
    })
  })
})
