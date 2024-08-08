import Image from "next/image"

import { db } from "./_lib/prisma"

import { Button } from "./_components/ui/button"
import { BarbershopItem } from "./_components/barbershop-item"
import { quickSearchOptions } from "./_constants/search"

import { Header } from "./_components/header"
import { BookingItem } from "./_components/booking-item"
import { Search } from "./_components/search"

export default async function Home() {
  const barbershops = await db.barbershop.findMany()
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  })

  return (
    <div>
      <Header />

      <div className="p-5">
        <h2 className="text-xl font-bold">Olá, Matheus</h2>
        <p>Sexta-feira, 2 de Agosto</p>

        {/* BUSCA */}
        <Search />

        {/* BUSCA RAPIDA */}
        <div className="mt-6 flex gap-3 overflow-y-auto [&::-webkit-scrollbar]:hidden">
          {quickSearchOptions.map((item) => (
            <Button key={item.title} className="gap-2" variant="secondary">
              <Image
                src={item.imageUrl}
                width={16}
                height={16}
                alt={item.title}
              />
              {item.title}
            </Button>
          ))}
        </div>

        {/* IMAGEM */}
        <div className="relative mt-6 h-[150px] w-full">
          <Image
            alt="Agende nos melhores com FSW Barber"
            src="/banner-01.png"
            fill
            className="rounded-xl object-cover"
          />
        </div>

        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Agendamentos
        </h2>

        {/* AGENDAMENTO */}
        <BookingItem />

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
