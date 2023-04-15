import { useState, useEffect } from 'react'

import { PickerInline } from 'filestack-react'

import { useMutation, useQuery } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/File/FilesCell'

import { FileType, NewFile, ExistingFilesData } from './File/Types'

const CREATE_FILE_MUTATION = gql`
  mutation CreateFileMutation($input: CreateFileInput!) {
    createFile(input: $input) {
      id
    }
  }
`

const DragAndDropUpload = () => {
  const [files, setFiles] = useState<NewFile[]>([])
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

  const onDrop = async (response) => {
    const { filesUploaded } = response

    const newFiles = filesUploaded.map((file: FileType) => {
      return {
        name: file.filename,
        path: file.url,
        size: file.size,
        type: file.mimetype,
      }
    })

    setFiles((prevState) => {
      // Check if file already exists - no-op
      const existingFiles = existingFilesData.files.map((f) => f.name)
      const filteredNewFiles = newFiles.filter(
        (file) => !existingFiles.includes(file.name)
      )

      return [...prevState, ...filteredNewFiles]
    })
  }

  useEffect(() => {
    const createFiles = async () => {
      try {
        // create a new file record for each file in the database
        await Promise.all(
          files.map((file) =>
            createFile({
              variables: {
                input: {
                  name: file.name,
                  path: file.path,
                  size: file.size,
                  type: file.type,
                },
              },
            })
          )
        )

        setFiles([])
      } catch (error) {
        console.error(error)
      }
    }

    if (files.length > 0) {
      createFiles()
    }
  }, [files, createFile])

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
    <>
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
    </>
  )
}

export default DragAndDropUpload
