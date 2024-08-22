'use client'

import { useSession } from 'next-auth/react'
import { Calendar, UserCircle } from 'lucide-react'

import { Button } from './ui/button'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { SignInDialog } from './sign-in-dialog'
import { Avatar, AvatarImage } from './ui/avatar'
import Link from 'next/link'

export function Navbar() {
  const { data } = useSession()

  return (
    <div className="hidden items-center gap-6 lg:flex">
      <Button className="justify-start gap-2" variant="ghost" asChild>
        <Link href="/bookings">
          <Calendar size={18} />
          Agendamentos
        </Link>
      </Button>

      {!data?.user ? (
        <Dialog>
          <DialogTrigger asChild>
            <Button className="justify-start gap-2" variant="default">
              <UserCircle size={18} />
              Perfil
            </Button>
          </DialogTrigger>

          <DialogContent className="w-[90%] rounded-lg">
            <SignInDialog />
          </DialogContent>
        </Dialog>
      ) : (
        <div className="flex items-center gap-2">
          <Avatar className="h-[36px] w-[36px]">
            <AvatarImage
              src={data.user.image ? data.user.image : '/avatar.jpg'}
            />
          </Avatar>

          <div>
            <p className="font-bold">{data.user.name}</p>
          </div>
        </div>
      )}
    </div>
  )
}
