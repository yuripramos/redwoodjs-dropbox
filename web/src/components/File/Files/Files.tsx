import type { DeleteFileMutationVariables, FindFiles } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/File/FilesCell'
import { timeTag, truncate } from 'src/lib/formatters'

const DELETE_FILE_MUTATION = gql`
  mutation DeleteFileMutation($id: Int!) {
    deleteFile(id: $id) {
      id
    }
  }
`

const FilesList = ({ files }: FindFiles) => {
  const [deleteFile] = useMutation(DELETE_FILE_MUTATION, {
    onCompleted: () => {
      toast.success('File deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id: DeleteFileMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete file ' + id + '?')) {
      deleteFile({ variables: { id } })
    }
  }

  return (
    <div
      className="rw-segment rw-table-wrapper-responsive"
      data-testid="files-cell"
    >
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Path</th>
            <th>Size</th>
            <th>Type</th>
            <th>Created at</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file) => (
            <tr key={file.id}>
              <td>{truncate(file.id)}</td>
              <td>{truncate(file.name)}</td>
              <td>{truncate(file.path)}</td>
              <td>{truncate(file.size)}</td>
              <td>{truncate(file.type)}</td>
              <td>{timeTag(file.createdAt)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.file({ id: file.id })}
                    title={'Show file ' + file.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editFile({ id: file.id })}
                    title={'Edit file ' + file.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete file ' + file.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(file.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default FilesList
