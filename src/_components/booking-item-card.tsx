import { Prisma } from '@prisma/client'
import { format, isFuture } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { Card, CardContent } from './ui/card'

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: {
        include: {
          barbershop: true
        }
      }
    }
  }>
}

export function BookingItemCard({ booking }: BookingItemProps) {
  const {
    service: { barbershop },
  } = booking
  const isConfirmed = isFuture(booking.date)

  return (
    <Card className="min-w-[90%]">
      <CardContent className="flex justify-between p-0">
        {/* LEFT */}
        <div className="flex flex-col gap-2 py-5 pl-5">
          <Badge
            className="w-fit"
            variant={isConfirmed ? 'default' : 'secondary'}
          >
            {isConfirmed ? 'Confirmado' : 'Finalizado'}
          </Badge>

          <h3 className="text-left font-bold">{booking.service.name}</h3>

          <div className="flex items-center gap-2">
            <Avatar className="size-6">
              <AvatarImage src={barbershop.imageUrl} />
            </Avatar>

            <p className="text-sm">{barbershop.name}</p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
          <p className="text-sm capitalize">
            {format(booking.date, 'MMMM', { locale: ptBR })}
          </p>
          <p className="text-2xl">
            {format(booking.date, 'dd', { locale: ptBR })}
          </p>
          <p className="text-sm">
            {format(booking.date, 'HH:mm', { locale: ptBR })}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
