import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const HomePage = () => {
  return (
    <>
      <MetaTags title="Home" description="Home page" />

      <h1 className="text-center text-4xl font-bold text-indigo-700">
        Drop your files like dropbox! 📦
      </h1>
      <p className="mt-4 text-center text-gray-600">
        Find me in <code>./web/src/pages/HomePage/HomePage.tsx</code>
      </p>
      <p className="mt-4 text-center text-gray-600">
        My default route is named <code>home</code>, link to me with `
        <Link
          to={routes.home()}
          className="text-indigo-500 underline hover:text-indigo-700"
        >
          Home
        </Link>
        `
      </p>
    </>
  )
}

export default HomePage
