import { ChevronLeft, MapPinIcon, MenuIcon, StarIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { notFound } from 'next/navigation'

import { db } from '@/app/_lib/prisma'

import { Button } from '@/app/_components/ui/button'
import { Sheet, SheetTrigger } from '@/app/_components/ui/sheet'
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@/app/_components/ui/table'

import { ServiceItem } from '@/app/_components/service-item'
import { PhoneItem } from '@/app/_components/phone-item'
import { SidebarSheet } from '@/app/_components/sidebar-sheet'
import { Header } from '@/app/_components/header'
import { BarbershopMapInfo } from '@/app/_components/barbershop-map-info'

interface BarbershopPageProps {
  params: {
    id: string
  }
}

export default async function BarbershopPage({ params }: BarbershopPageProps) {
  const barbershop = await db.barbershop.findUnique({
    where: { id: params.id },
    include: {
      services: true,
    },
  })

  if (!barbershop) {
    return notFound()
  }

  return (
    <div className="">
      <div className="hidden md:block">
        <Header showSearch />
      </div>

      <div className="w-full md:m-auto md:w-[1146px] md:max-w-[96%] md:py-10 lg:flex lg:items-start lg:gap-10">
        {/* CONTEÚDO */}
        <div className="lg:flex-1">
          {/* IMAGEM */}
          <div className="relative h-[250px] w-full md:h-[485px]">
            <Image
              alt={barbershop.name}
              src={barbershop?.imageUrl}
              fill
              className="object-cover md:rounded-lg"
            />

            <Button
              size="icon"
              variant="secondary"
              className="absolute left-4 top-4 md:hidden"
              asChild
            >
              <Link href="/">
                <ChevronLeft size={18} />
              </Link>
            </Button>

            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute right-4 top-4"
                >
                  <MenuIcon size={18} />
                </Button>
              </SheetTrigger>

              <SidebarSheet />
            </Sheet>
          </div>

          <div className="border-b border-solid p-5 md:px-0 lg:flex lg:items-start lg:justify-between lg:border-0">
            <div>
              <h1 className="mb-3 text-xl font-bold lg:text-3xl">
                {barbershop.name}
              </h1>

              <div className="mb-2 flex items-center gap-2">
                <MapPinIcon className="text-primary" size={18} />

                <p className="text-sm">{barbershop?.address}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 lg:flex-col lg:rounded-lg lg:bg-card lg:px-5 lg:py-3">
              <div className="flex items-center gap-2">
                <StarIcon className="fill-primary text-primary" size={18} />

                <p className="text-sm lg:text-xl">5,0</p>
              </div>
              <p className="text-sm">(499 avaliações)</p>
            </div>
          </div>

          {/* DESCRIÇÃO */}
          <div className="space-y-3 border-b border-solid p-5 md:px-0 lg:hidden">
            <h2 className="text-xs font-bold uppercase text-gray-400">
              Sobre Nós
            </h2>

            <p className="text-justify text-sm">{barbershop?.description}</p>
          </div>

          {/* SERVIÇOS */}
          <div className="space-y-3 border-b border-solid p-5 md:px-0 lg:border-0">
            <h2 className="text-xs font-bold uppercase text-gray-400 lg:text-sm">
              Serviços
            </h2>

            <div className="space-y-3 md:grid md:grid-cols-2 md:gap-5 md:space-y-0">
              {barbershop.services.map((service) => (
                <ServiceItem
                  key={service.id}
                  service={JSON.parse(JSON.stringify(service))}
                  barbershop={JSON.parse(JSON.stringify(barbershop))}
                />
              ))}
            </div>
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="w-full lg:w-[32%] lg:rounded-lg lg:bg-card lg:p-5">
          <div className="hidden lg:block">
            <BarbershopMapInfo barbershop={barbershop} />
          </div>

          {/* DESCRIÇÃO */}
          <div className="hidden space-y-3 border-b border-solid p-5 md:px-0 lg:block">
            <h2 className="text-sm font-bold uppercase text-white">
              Sobre Nós
            </h2>

            <p className="text-justify text-sm text-gray-500">
              {barbershop?.description}
            </p>
          </div>

          {/* CONTATO */}
          <div className="space-y-3 p-5 md:px-0">
            <h2 className="text-xs font-bold uppercase text-gray-400 lg:text-sm lg:text-white">
              Contato
            </h2>

            {barbershop.phones.map((phone, index) => (
              <PhoneItem key={index} phone={phone} />
            ))}
          </div>

          {/* HORÁRIOS */}
          <div className="hidden border-y border-solid py-3 lg:block">
            <Table>
              <TableBody>
                <TableRow className="hover:bg-0 border-0">
                  <TableCell className="px-0 py-1.5 text-sm text-gray-500">
                    Segunda
                  </TableCell>
                  <TableCell className="flex justify-end px-0 py-1.5 text-sm text-white">
                    Fechado
                  </TableCell>
                </TableRow>
                <TableRow className="hover:bg-0 border-0">
                  <TableCell className="px-0 py-1.5 text-sm text-gray-500">
                    Terça-feira
                  </TableCell>
                  <TableCell className="flex justify-end px-0 py-1.5 text-sm text-white">
                    09:00 - 10:00
                  </TableCell>
                </TableRow>
                <TableRow className="hover:bg-0 border-0">
                  <TableCell className="px-0 py-1.5 text-sm text-gray-500">
                    Quarta-feira
                  </TableCell>
                  <TableCell className="flex justify-end px-0 py-1.5 text-sm text-white">
                    09:00 - 10:00
                  </TableCell>
                </TableRow>
                <TableRow className="hover:bg-0 border-0">
                  <TableCell className="px-0 py-1.5 text-sm text-gray-500">
                    Quinta-feira
                  </TableCell>
                  <TableCell className="flex justify-end px-0 py-1.5 text-sm text-white">
                    09:00 - 10:00
                  </TableCell>
                </TableRow>
                <TableRow className="hover:bg-0 border-0">
                  <TableCell className="px-0 py-1.5 text-sm text-gray-500">
                    Sexta-feira
                  </TableCell>
                  <TableCell className="flex justify-end px-0 py-1.5 text-sm text-white">
                    09:00 - 10:00
                  </TableCell>
                </TableRow>
                <TableRow className="hover:bg-0 border-0">
                  <TableCell className="px-0 py-1.5 text-sm text-gray-500">
                    Sábado
                  </TableCell>
                  <TableCell className="flex justify-end px-0 py-1.5 text-sm text-white">
                    09:00 - 10:00
                  </TableCell>
                </TableRow>
                <TableRow className="hover:bg-0 border-0">
                  <TableCell className="px-0 py-1.5 text-sm text-gray-500">
                    Domingo
                  </TableCell>
                  <TableCell className="flex justify-end px-0 py-1.5 text-sm text-white">
                    Fechado
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <div className="hidden items-center justify-between py-11 pb-5 lg:flex">
            <p className="text-sm">Em parceria com</p>

            <Image alt="FSW Barber" src="/logo.png" width={120} height={18} />
          </div>
        </div>
      </div>
    </div>
  )
}
