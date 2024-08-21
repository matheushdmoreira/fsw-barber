import Image from 'next/image'
import { MenuIcon } from 'lucide-react'

import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'
import { Sheet, SheetTrigger } from './ui/sheet'
import { SidebarSheet } from './sidebar-sheet'
import Link from 'next/link'
import { Navbar } from './navbar'

export function Header() {
  return (
    <Card>
      <CardContent className="flex flex-row items-center justify-between p-5 lg:m-auto lg:max-w-[1124px] lg:p-7 lg:px-0">
        <Link href="/">
          <Image alt="FSW Barber" src="/logo.png" width={120} height={18} />
        </Link>

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
