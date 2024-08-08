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

export function SidebarSheet() {
  return (
    <SheetContent className="overflow-y-auto">
      <SheetHeader>
        <SheetTitle className="text-left">Menu</SheetTitle>
      </SheetHeader>

      <div className="flex items-center gap-3 border-b border-solid py-5">
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

              <Button variant="outline" className="gap-2 font-bold">
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

        {/* <Avatar className="border-2 border-solid border-primary">
          <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8QXZhdGFyfGVufDB8fDB8fHww" />
        </Avatar>

        <div>
          <p className="font-bold">Matheus Moreira</p>
          <p className="text-xs">matheushdmoreira@gmail.com</p>
        </div> */}
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
          <Button
            key={option.title}
            className="justify-start gap-2"
            variant="ghost"
          >
            <Image
              alt={option.title}
              src={option.imageUrl}
              width={18}
              height={18}
            />

            {option.title}
          </Button>
        ))}
      </div>

      <div className="flex flex-col py-5">
        <Button className="justify-start gap-2" variant="ghost">
          <LogOut size={18} />
          Sair da Conta
        </Button>
      </div>
    </SheetContent>
  )
}
