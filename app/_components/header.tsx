import Image from 'next/image'
import { MenuIcon } from 'lucide-react'

import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'
import { Sheet, SheetTrigger } from './ui/sheet'
import { SidebarSheet } from './sidebar-sheet'
import Link from 'next/link'
import { Navbar } from './navbar'
import { Search } from './search'

interface HeaderProps {
  showSearch?: boolean
}

export function Header({ showSearch = false }: HeaderProps) {
  return (
    <Card>
      <CardContent className="flex flex-row items-center justify-between p-5 lg:m-auto lg:w-[1146px] lg:max-w-[94%] lg:p-7 lg:px-0">
        <Link href="/">
          <Image alt="FSW Barber" src="/logo.png" width={120} height={18} />
        </Link>

        {showSearch && (
          <div className="hidden lg:mx-11 lg:block lg:flex-1">
            <Search />
          </div>
        )}

        <Navbar />

        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline">
                <MenuIcon />
              </Button>
            </SheetTrigger>

            <SidebarSheet />
          </Sheet>
        </div>
      </CardContent>
    </Card>
  )
}
