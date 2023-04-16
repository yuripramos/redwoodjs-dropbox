import { PickerInline } from 'filestack-react'

import { useMutation, useQuery } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/File/FilesCell'

import { FileType, ExistingFilesData } from '../File/Types'

import { useDragAndDropUpload } from './useDragAndDropUpload'

const CREATE_FILE_MUTATION = gql`
  mutation CreateFileMutation($input: CreateFileInput!) {
    createFile(input: $input) {
      id
    }
  }
`

const DragAndDropUpload = () => {
  const { data: existingFilesData } = useQuery<ExistingFilesData>(QUERY)
  const [createFile, { loading, error }] = useMutation(CREATE_FILE_MUTATION, {
    onCompleted: () => {
      toast.success('File created')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const { onDrop } = useDragAndDropUpload(createFile, existingFilesData)

  const OnFileSelected = async (
    existingFilesData: ExistingFilesData,
    file: FileType
  ) => {
    const hasSameName = existingFilesData.files.some(
      (fileData) => fileData.name === file.filename
    )

    if (hasSameName) {
      throw new Error('same name in the database, try a different name')
    }
  }

  return (
    <div data-testid="drag-and-drop-file" className="lg:min-w-[900px]">
      <PickerInline
        apikey={process.env.REDWOOD_ENV_FILESTACK_API_KEY}
        pickerOptions={{
          onFileSelected: (file) => OnFileSelected(existingFilesData, file),
        }}
        onSuccess={onDrop}
      />
      {loading && (
        <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
          <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-t-2 border-blue-500"></div>
          <div className="ml-4 font-bold text-white">
            Creating new item in the database...
          </div>
        </div>
      )}
      {error && <div>Error! Please try again</div>}
    </div>
  )
}

export default DragAndDropUpload
