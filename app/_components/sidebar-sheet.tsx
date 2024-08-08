"use client"

import Link from "next/link"
import { Calendar, HomeIcon, LogIn, LogOut } from "lucide-react"
import Image from "next/image"

import { quickSearchOptions } from "../_constants/search"

import { Button } from "./ui/button"
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { signIn, signOut, useSession } from "next-auth/react"
import { Avatar, AvatarImage } from "./ui/avatar"

export function SidebarSheet() {
  const { data } = useSession()

  async function handleLogInWithGoogleClick() {
    await signIn("google")
  }

  async function handleLogOutClick() {
    await signOut()
  }

  return (
    <SheetContent className="overflow-y-auto">
      <SheetHeader>
        <SheetTitle className="text-left">Menu</SheetTitle>
      </SheetHeader>

      <div className="flex items-center gap-3 border-b border-solid py-5">
        {!data?.user ? (
          <div className="flex w-full items-center justify-between">
            <h2 className="text-lg font-bold">Olá, faça seu login!</h2>

            <Dialog>
              <DialogTrigger asChild>
                <Button size="icon">
                  <LogIn size={18} />
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[90%] rounded-lg">
                <DialogHeader>
                  <DialogTitle>Faça seu login</DialogTitle>
                  <DialogDescription>
                    Conecte-se com sua conta Google.
                  </DialogDescription>
                </DialogHeader>

                <Button
                  variant="outline"
                  className="gap-2 font-bold"
                  onClick={handleLogInWithGoogleClick}
                >
                  <Image
                    alt="Conecte-se com sua conta Google"
                    src="/google.svg"
                    width={18}
                    height={18}
                  />
                  Google
                </Button>
              </DialogContent>
            </Dialog>
          </div>
        ) : (
          <>
            <Avatar className="border-2 border-solid border-primary">
              <AvatarImage
                src={data.user.image ? data.user.image : "/avatar.jpg"}
              />
            </Avatar>

            <div>
              <p className="font-bold">{data.user.name}</p>
              <p className="text-xs">{data.user.email}</p>
            </div>
          </>
        )}
      </div>

      <div className="flex flex-col gap-2 border-b border-solid py-5">
        <SheetClose asChild>
          <Button className="justify-start gap-2" variant="default" asChild>
            <Link href="/">
              <HomeIcon size={18} />
              Início
            </Link>
          </Button>
        </SheetClose>

        <Button className="justify-start gap-2" variant="ghost">
          <Calendar size={18} />
          Agendamentos
        </Button>
      </div>

      <div className="flex flex-col gap-2 border-b border-solid py-5">
        {quickSearchOptions.map((option) => (
          <SheetClose key={option.title} asChild>
            <Button className="justify-start gap-2" variant="ghost" asChild>
              <Link href={`/barbershops?service=${option.title}`}>
                <Image
                  alt={option.title}
                  src={option.imageUrl}
                  width={18}
                  height={18}
                />

                {option.title}
              </Link>
            </Button>
          </SheetClose>
        ))}
      </div>

      <div className="flex flex-col py-5">
        <Button
          className="justify-start gap-2"
          variant="ghost"
          onClick={handleLogOutClick}
        >
          <LogOut size={18} />
          Sair da Conta
        </Button>
      </div>
    </SheetContent>
  )
}
