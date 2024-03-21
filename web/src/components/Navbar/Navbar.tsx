import { DocumentIcon, HandIcon, LogoutIcon } from '@heroicons/react/solid'
import { Link, routes } from '@redwoodjs/router'
import { useAuth } from 'src/auth'

const Navbar = () => {
  const { isAuthenticated, currentUser, logOut } = useAuth()

  const navLinks = [
    {
      label: 'Bet',
      href: routes.betList(),
    },
  ]

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
            <p className="flex gap-2">
              {currentUser.email}
              <div className="border-2 border-amber-100 bg-gray-100">
                <LogoutIcon className="h-6 w-6" onClick={logOut} />
              </div>
            </p>
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
