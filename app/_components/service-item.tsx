import { BarbershopService } from "@prisma/client"
import Image from "next/image"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"

interface ServiceItemProps {
  service: BarbershopService
}

export function ServiceItem({ service }: ServiceItemProps) {
  return (
    <Card>
      <CardContent className="flex w-full items-center gap-3 p-3">
        {/* IMAGE */}
        <div className="relative h-[110px] w-[110px]">
          <Image
            alt={service.name}
            src={service.imageUrl}
            className="rounded-lg object-cover"
            fill
          />
        </div>

        {/* DIREITA */}
        <div className="flex-1 space-y-2">
          <h3 className="font-semibold">{service.name}</h3>
          <p className="text-sm text-gray-400">{service.description}</p>

          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-primary">
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(Number(service.price))}
            </p>

            <Button variant="secondary" size="sm">
              Reservar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
