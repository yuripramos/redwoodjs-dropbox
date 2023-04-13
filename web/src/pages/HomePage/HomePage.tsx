import { MetaTags } from '@redwoodjs/web'

import LayoutWrapper from 'src/layouts/LayoutWrapper'

import DragAndDropFile from '../../components/DragAndDropFile'

const HomePage = () => {
  return (
    <LayoutWrapper>
      <div className="py-4 text-center">
        <h2 className="mt-6 text-center text-xl text-gray-100">
          Just drop your file below and we&quot;ll take care of the rest 📦
        </h2>
      </div>
      <div className="flex h-screen flex-col justify-center">
        <MetaTags title="Home" description="Home page" />
        <DragAndDropFile />
      </div>
    </LayoutWrapper>
  )
}

export default HomePage
