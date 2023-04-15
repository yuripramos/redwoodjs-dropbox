import { MetaTags } from '@redwoodjs/web'

import FilesCell from 'src/components/File/FilesCell'
import LayoutWrapper from 'src/layouts/LayoutWrapper'

import DragAndDropFile from '../../components/DragAndDrop/DragAndDropFile'

const HomePage = () => {
  return (
    <LayoutWrapper>
      <div className="py-4 text-center">
        <h2 className="mt-6 text-center text-xl text-gray-100">
          Just drop your file below and we&quot;ll take care of the rest 📦
        </h2>
      </div>
      <div className="flex h-screen min-w-full flex-col">
        <MetaTags title="Home" description="Home page" />
        <DragAndDropFile data-testid="drag-and-drop-file" />
        <h3 className="my-3 text-2xl font-bold">Files uploaded</h3>
        <FilesCell data-testid="files-cell" />
      </div>
    </LayoutWrapper>
  )
}

export default HomePage
