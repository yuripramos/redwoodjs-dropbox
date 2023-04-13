import { useState, useRef, useEffect } from 'react'

import { useDropzone } from 'react-dropzone'

interface FileObject {
  name: string
  lastModified: number
}

const DragAndDropUpload = (): JSX.Element => {
  const [files, setFiles] = useState<FileObject[]>([])

  const onDrop = (acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map((file) => {
      return {
        name: file.name,
        lastModified: file.lastModified,
      }
    })

    setFiles((prevState) => {
      // Check if file already exists
      const existingFiles = prevState.map((f) => f.name)
      const filteredNewFiles = newFiles.filter(
        (file) => !existingFiles.includes(file.name)
      )

      return [...prevState, ...filteredNewFiles]
    })
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <div className="flex h-screen flex-col items-center">
      <div
        {...getRootProps()}
        className="mb-6 cursor-pointer rounded-lg border-2 border-dashed border-black px-6 py-12"
      >
        <div className="icons text-center text-3xl ">
          <i className="fas fa-file-image -rotate-45 scale-75 transform"></i>
          <i className="fas fa-file-alt translate-y-2 scale-90 transform"></i>
          <i className="fas fa-file-pdf rotate-45 scale-75 transform"></i>
        </div>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-2xl font-bold">Drop the files here ...</p>
        ) : (
          <p className="text-2xl font-bold ">
            Drag and drop your files here, or click to select files
          </p>
        )}
      </div>
      {files.length > 0 && (
        <table
          className="text-black-200 mt-20 w-full table-fixed overflow-hidden rounded-md border border-b"
          style={{ background: `rgb(196 125 14 / 39%)` }}
        >
          <thead>
            <tr className="border-gray-30 border-b">
              <th className="w-1/2 px-4 py-2 text-left font-medium uppercase tracking-wider ">
                Name
              </th>
              <th className="w-1/4 px-4 py-2 text-left font-medium uppercase tracking-wider">
                Modified
              </th>
              <th className="w-1/4 px-4 py-2 text-center font-medium uppercase tracking-wider ">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {files.map((file, index) => (
              <TableRow key={file.name} file={file} index={index} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export function TableRow(props) {
  const [showTooltip, setShowTooltip] = useState(false)
  const tooltipRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
        setShowTooltip(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [tooltipRef])

  return (
    <tr
      className={`${
        props.index % 2 === 0 ? 'bg-white' : 'bg-gray-100'
      } border-b border-gray-300 transition-opacity duration-200 hover:bg-gray-200`}
    >
      <td className="px-4 py-2 text-gray-700">{props.file.name}</td>
      <td className="px-4 py-2 text-gray-700">
        {new Date(props.file.lastModified).toLocaleDateString()}
      </td>
      <td className="px-4 py-2 text-center">
        <button
          className="hover:text-indigo-600"
          onClick={() => setShowTooltip(!showTooltip)}
        >
          <span className="sr-only">Actions</span>
          <span className="h-20 w-20">...</span>
        </button>
        {showTooltip && (
          <div
            ref={tooltipRef}
            className="absolute right-1 z-10 mt-2 w-26 rounded-md border border-gray-300 bg-white py-2 shadow-lg"
          >
            <button className="block w-full px-4 py-2 text-left hover:bg-gray-100 hover:text-gray-900">
              Remove
            </button>
            <button className="block w-full px-4 py-2 text-left hover:bg-gray-100 hover:text-gray-900">
              Update Name
            </button>
          </div>
        )}
      </td>
    </tr>
  )
}

export default DragAndDropUpload
