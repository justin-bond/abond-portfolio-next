import Link from 'next/link'
import React from 'react'

import Button from '../Button'

const Header = () => {
  return (
    <header className="max-w-7xl mx-auto py-4 px-10 text-xl text-orange-600">
      <div className="flex items-center">
        <div className="flex-1">
          <Link href="/">Aileen Bond</Link>
        </div>
        <div className="flex-1 flex justify-center">
          <nav className="flex gap-x-5">
            <Link href="/work">Work</Link>
            <Link href="/about">About</Link>
          </nav>
        </div>
        <div className="flex-1 flex justify-end">
          <Button>Contact Me</Button>
        </div>
      </div>
    </header>
  )
}

export default Header
