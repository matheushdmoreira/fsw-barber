import { Barbershop } from '@prisma/client'
import { StarIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'

interface BarberShopItemProps {
  barbershop: Barbershop
}

export function BarbershopItem({ barbershop }: BarberShopItemProps) {
  return (
    <Card className="rounded-2xl">
      <CardContent className="p-1 pb-0">
        {/* IMAGEM */}
        <div className="relative h-[160px] w-full max-w-full">
          <Image
            alt={barbershop.name}
            src={barbershop.imageUrl}
            fill
            className="rounded-2xl object-cover"
          />

          <Badge
            className="absolute left-2 top-2 space-x-1"
            variant="secondary"
          >
            <StarIcon size={12} className="fill-primary text-primary" />

            <p className="text-xs font-semibold">5,0</p>
          </Badge>
        </div>

        {/* TEXTO */}
        <div className="px-1 py-3">
          <h3 className="truncate font-semibold">{barbershop.name}</h3>
          <p className="truncate text-sm text-gray-400 lg:mt-1">
            {barbershop.address}
          </p>

          <Button variant="secondary" className="mt-3 w-full" asChild>
            <Link href={`/barbershops/${barbershop.id}`}>Reservar</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
