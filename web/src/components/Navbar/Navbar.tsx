import { DocumentIcon, HandIcon } from '@heroicons/react/solid'
import { Link, routes } from '@redwoodjs/router'
import { useAuth } from 'src/auth'

const navLinks = [
  {
    label: 'Vote',
    href: '/vote',
  },
]

const Navbar = () => {
  const { isAuthenticated, currentUser } = useAuth()

  return (
    <header className="padding-x absolute z-10 w-full py-8">
      <nav className="max-container flex items-center justify-between">
        <Link to="/" className="m-0 flex h-[29px] w-[129px] items-center">
          <DocumentIcon className="h-6 w-6 text-blue-500" />
          <span className="text-2xl">RW_VOTE</span>
        </Link>

        <ul className="flex flex-1 items-center justify-center gap-16 max-lg:hidden">
          {navLinks.map((item) => (
            <li key={item.label}>
              <Link
                to={item.href}
                className="font-montserrat text-slate-gray text-lg leading-normal"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="font-montserrat wide:mr-24 flex gap-2 text-lg font-medium leading-normal max-lg:hidden">
          {isAuthenticated ? (
            currentUser.email
          ) : (
            <Link to={routes.login()}>Sign in</Link>
          )}
        </div>
        <div className="hidden max-lg:block">
          <HandIcon />
        </div>
      </nav>
    </header>
  )
}

export default Navbar
