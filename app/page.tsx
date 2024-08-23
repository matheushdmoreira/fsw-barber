import Image from 'next/image'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './_components/ui/carousel'

import { authOptions } from './_lib/auth'
import { db } from './_lib/prisma'

import { Button } from './_components/ui/button'

import { BarbershopItem } from './_components/barbershop-item'
import { quickSearchOptions } from './_constants/search'
import { Header } from './_components/header'
import { BookingItem } from './_components/booking-item'
import { Search } from './_components/search'

import { getConfirmedBookings } from './_data/get-confirmed-bookings'

export default async function Home() {
  const session = await getServerSession(authOptions)

  const barbershops = await db.barbershop.findMany()
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: 'desc',
    },
  })

  const confirmedBookings = await getConfirmedBookings()

  return (
    <div>
      <Header />

      <>
        <div className="lg:bg-hero lg:bg-cover lg:bg-[center_top_-7rem] lg:py-16">
          <div className="w-full p-5 lg:m-auto lg:flex lg:w-[1146px] lg:max-w-[96%] lg:gap-32 lg:p-0">
            <div className="lg:flex-1">
              <h2 className="text-xl font-bold lg:text-2xl">
                Olá, {session?.user ? session.user.name : 'bem vindo'}
              </h2>
              <p>
                <span className="capitalize">
                  {format(new Date(), 'EEEE', { locale: ptBR })}
                </span>
                {format(new Date(), ", dd 'de' MMMM", { locale: ptBR })}
              </p>

              {/* BUSCA */}
              <div className="mt-5 lg:mt-10">
                <Search />
              </div>

              {/* BUSCA RÁPIDA */}
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

              {confirmedBookings.length > 0 && (
                <>
                  <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400 lg:mt-10">
                    Agendamentos
                  </h2>

                  {/* AGENDAMENTO */}
                  <div className="flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
                    {confirmedBookings.map((booking) => (
                      <BookingItem
                        key={booking.id}
                        booking={JSON.parse(JSON.stringify(booking))}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="w-full lg:w-[617px]">
              <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400 lg:mb-6 lg:mt-0 lg:text-sm">
                Recomendados
              </h2>

              <Carousel
                opts={{
                  align: 'start',
                }}
              >
                <CarouselContent>
                  {barbershops.map((barbershop) => (
                    <CarouselItem
                      key={barbershop.id}
                      className="basis-1/2 md:basis-1/3 lg:basis-2/5"
                    >
                      <BarbershopItem barbershop={barbershop} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="text-md hidden h-12 w-12 disabled:opacity-0 lg:left-[-23px] lg:flex" />
                <CarouselNext className="text-md hidden h-12 w-12 disabled:opacity-0 lg:right-[-23px] lg:flex" />
              </Carousel>
            </div>
          </div>
        </div>

        <div className="p-5 lg:m-auto lg:w-[1146px] lg:max-w-[96%] lg:p-0 lg:py-10">
          <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400 lg:mt-0 lg:text-sm">
            Populares
          </h2>

          <Carousel
            opts={{
              align: 'start',
            }}
          >
            <CarouselContent>
              {popularBarbershops.map((barbershop) => (
                <CarouselItem
                  key={barbershop.id}
                  className="basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
                >
                  <BarbershopItem barbershop={barbershop} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="text-md hidden h-12 w-12 disabled:opacity-0 lg:left-[-23px] lg:flex" />
            <CarouselNext className="text-md hidden h-12 w-12 disabled:opacity-0 lg:right-[-23px] lg:flex" />
          </Carousel>
        </div>
      </>
    </div>
  )
}
