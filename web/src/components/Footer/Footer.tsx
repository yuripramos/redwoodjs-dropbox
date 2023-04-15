import React from 'react'

const Footer = () => {
  return (
    <footer className="w-full bg-black py-4 text-white">
      <div className="container mx-auto text-center">
        <p>
          &copy; {new Date().getFullYear()} Yuri Ramos 🧑🏾‍💻. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
