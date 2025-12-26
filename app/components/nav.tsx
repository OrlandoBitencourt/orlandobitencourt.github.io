'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = {
  '/': {
    name: 'inicio',
  },
  '/blog': {
    name: 'artigos',
  },
  '/challenges': {
    name: 'desafios',
  },
  '/about': {
    name: 'sobre',
  },
  '/contact': {
    name: 'contato',
  }
}

export function Navbar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(path)
  }

  return (
    <>
      {/* Mobile AppBar - Fixed at top */}
      <nav className="md:hidden fixed top-0 left-0 right-0 z-50 bg-neutral-50 dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center justify-around px-4 py-3">
          {Object.entries(navItems).map(([path, { name }]) => {
            const active = isActive(path)
            return (
              <Link
                key={path}
                href={path}
                className={`
                  flex flex-col items-center gap-1 px-3 py-2 rounded-lg text-xs font-medium
                  transition-all duration-200 ease-in-out min-w-[60px]
                  ${active
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
                  }
                `}
              >
                <span className="capitalize">{name}</span>
                {active && (
                  <div className="w-1 h-1 rounded-full bg-blue-600 dark:bg-blue-400"></div>
                )}
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Spacer for mobile to prevent content from going under AppBar */}
      <div className="md:hidden h-[60px]"></div>

      {/* Desktop Navigation - Pill style */}
      <aside className="hidden md:block mb-16 tracking-tight">
        <div className="lg:sticky lg:top-20">
          <nav
            className="flex flex-row items-center justify-center relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
            id="nav"
          >
            <div className="flex flex-row items-center gap-1 bg-neutral-100 dark:bg-neutral-900 rounded-full p-1">
              {Object.entries(navItems).map(([path, { name }]) => {
                const active = isActive(path)
                return (
                  <Link
                    key={path}
                    href={path}
                    className={`
                      relative px-4 py-2 rounded-full text-sm font-medium
                      transition-all duration-200 ease-in-out
                      ${active
                        ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 shadow-sm'
                        : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50'
                      }
                    `}
                  >
                    {name}
                  </Link>
                )
              })}
            </div>
          </nav>
        </div>
      </aside>
    </>
  )
}
