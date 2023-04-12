import { ReactNode } from 'react'

import Header from 'src/components/Header'

const LayoutWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-screen flex-col items-center">
      <Header />
      {children}
      <footer>My FooterMy FooterMy FooterMy FooterMy FooterMy Footer</footer>
    </div>
  )
}

export default LayoutWrapper
