import { Barbershop, BarbershopService } from '@prisma/client'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { Card, CardContent } from './ui/card'

interface BookingSummaryProps {
  service: Pick<BarbershopService, 'name' | 'price'>
  barbershop: Pick<Barbershop, 'name'>
  selectedDate: Date
}

export function BookingSummary({
  service,
  barbershop,
  selectedDate,
}: BookingSummaryProps) {
  return (
    <Card>
      <CardContent className="space-y-3 p-3">
        <div className="flex items-center justify-between">
          <h2 className="font-bold">{service.name}</h2>
          <p className="text-sm font-bold">
            {Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(Number(service.price))}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-400">Data</p>
          <p className="text-sm">
            {format(selectedDate, "d 'de' MMMM", {
              locale: ptBR,
            })}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-400">Horário</p>
          <p className="text-sm">
            {format(selectedDate, 'HH:mm', {
              locale: ptBR,
            })}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-400">Barbearia</p>
          <p className="text-sm">{barbershop.name}</p>
        </div>
      </CardContent>
    </Card>
  )
}
