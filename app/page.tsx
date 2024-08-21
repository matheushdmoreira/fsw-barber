import Image from 'next/image'

import { db } from './_lib/prisma'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { getServerSession } from 'next-auth'
import Link from 'next/link'

import { authOptions } from './_lib/auth'

import { Button } from './_components/ui/button'

import { BarbershopItem } from './_components/barbershop-item'
import { quickSearchOptions } from './_constants/search'
import { Header } from './_components/header'
import { BookingItem } from './_components/booking-item'
import { Search } from './_components/search'

export default async function Home() {
  const session = await getServerSession(authOptions)

  const barbershops = await db.barbershop.findMany()
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: 'desc',
    },
  })

  const confirmedBookings = session?.user
    ? await db.booking.findMany({
        where: {
          userId: (session.user as any).id,
          date: {
            gte: new Date(),
          },
        },
        include: {
          service: {
            include: {
              barbershop: true,
            },
          },
        },
        orderBy: {
          date: 'asc',
        },
      })
    : []

  return (
    <div>
      <Header />

      <div className="p-5 lg:m-auto lg:max-w-[1124px] lg:p-7 lg:px-0">
        <h2 className="text-xl font-bold">
          Olá, {session?.user ? session.user.name : 'bem vindo'}
        </h2>
        <p>
          <span className="capitalize">
            {format(new Date(), 'EEEE', { locale: ptBR })}
          </span>
          {format(new Date(), ", dd 'de' MMMM", { locale: ptBR })}
        </p>

        {/* BUSCA */}
        <div className="mt-5">
          <Search />
        </div>

        {/* BUSCA RAPIDA */}
        <div className="mt-6 flex gap-3 overflow-y-auto lg:hidden [&::-webkit-scrollbar]:hidden">
          {quickSearchOptions.map((item) => (
            <Button
              key={item.title}
              className="gap-2"
              variant="secondary"
              asChild
            >
              <Link href={`/barbershops?service=${item.title}`}>
                <Image
                  src={item.imageUrl}
                  width={16}
                  height={16}
                  alt={item.title}
                />
                {item.title}
              </Link>
            </Button>
          ))}
        </div>

        {/* IMAGEM */}
        <div className="relative mt-6 h-[150px] w-full lg:hidden">
          <Image
            alt="Agende nos melhores com FSW Barber"
            src="/banner-01.png"
            fill
            className="rounded-xl object-cover"
          />
        </div>

        {confirmedBookings && (
          <>
            <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
              Agendamentos
            </h2>

            {/* AGENDAMENTO */}
            <div className="flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
              {confirmedBookings.map((booking) => (
                <BookingItem key={booking.id} booking={booking} />
              ))}
            </div>
          </>
        )}

        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Recomendados
        </h2>

        <div className="flex gap-4 overflow-y-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>

        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Populares
        </h2>

        <div className="flex gap-4 overflow-y-auto [&::-webkit-scrollbar]:hidden">
          {popularBarbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </div>
  )
}
