import { useState, useEffect } from 'react'

import { FileType, NewFile } from '../File/Types'

export const useDragAndDropUpload = (createFile, existingFilesData) => {
  const [files, setFiles] = useState<NewFile[]>([])

  const onDrop = (response) => {
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

  return { onDrop }
}
