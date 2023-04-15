import { ReactNode } from 'react'

import Footer from 'src/components/Footer/Footer'
import Header from 'src/components/Header/Header'

const LayoutWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="flex flex-col items-center m-12">
        <Header />
        {children}
      </div>
      <Footer />
    </>
  )
}

export default LayoutWrapper
