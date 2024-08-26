'use client'

import { useEffect, useState } from 'react'
import { Booking, Prisma } from '@prisma/client'
import { isFuture } from 'date-fns'
import { toast } from 'sonner'

import { BookingItem } from './booking-item'
import { BookingSummary } from './booking-summary'
import { BarbershopMapInfo } from './barbershop-map-info'
import { PhoneItem } from './phone-item'
import { BookingItemDesktop } from './booking-item-desktop'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { Badge } from './ui/badge'
import { deleteBooking } from '../_actions/delete-booking'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'

type BookingInList = Prisma.BookingGetPayload<{
  include: {
    service: {
      include: {
        barbershop: true
      }
    }
  }
}>

interface BookingsListProps {
  confirmedBookings: BookingInList[]
  concludedBookings: BookingInList[]
}

export function BookingsList({
  confirmedBookings,
  concludedBookings,
}: BookingsListProps) {
  const [bookingSelected, setBookingSelected] = useState<BookingInList | null>(
    null,
  )

  async function handleCancelBooking(booking: Booking) {
    try {
      await deleteBooking(booking.id)
      toast.success('Reserva cancelada com sucesso!')
    } catch (error) {
      console.log(error)
      toast.error('Erro ao cancelar a reserva. Tente novamente.')
    }
  }

  useEffect(() => {
    setBookingSelected(
      confirmedBookings.length > 0
        ? confirmedBookings[0]
        : concludedBookings.length > 0
          ? concludedBookings[0]
          : null,
    )
  }, [confirmedBookings, concludedBookings])

  return (
    <div className="p-5 lg:m-auto lg:flex lg:w-[1146px] lg:max-w-[94%] lg:gap-10 lg:p-7 lg:px-0">
      <div className="lg:w-[50%]">
        <h1 className="text-xl font-bold">Agendamentos</h1>

        {confirmedBookings.length === 0 && concludedBookings.length === 0 && (
          <p className="text-gray-400">Você não tem agendamentos.</p>
        )}

        {confirmedBookings.length > 0 && (
          <>
            <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
              Confirmados
            </h2>
            <div className="space-y-3">
              {confirmedBookings.map((booking) => (
                <div key={booking.id}>
                  <div className="lg:hidden">
                    <BookingItem
                      booking={JSON.parse(JSON.stringify(booking))}
                    />
                  </div>
                  <div>
                    <BookingItemDesktop
                      booking={JSON.parse(JSON.stringify(booking))}
                      onChangeBooking={setBookingSelected}
                    />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {concludedBookings.length > 0 && (
          <>
            <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
              Finalizados
            </h2>
            <div className="space-y-3">
              {concludedBookings.map((booking) => (
                <div key={booking.id}>
                  <div className="lg:hidden">
                    <BookingItem
                      booking={JSON.parse(JSON.stringify(booking))}
                    />
                  </div>
                  <div>
                    <BookingItemDesktop
                      booking={JSON.parse(JSON.stringify(booking))}
                      onChangeBooking={setBookingSelected}
                    />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {bookingSelected && (
        <Card className="mt-20 hidden lg:block lg:w-[50%]">
          <CardContent>
            <div className="mt-6">
              <BarbershopMapInfo
                barbershop={bookingSelected.service.barbershop}
              />
            </div>

            {/* DESCRIÇÃO */}
            <div className="hidden space-y-3 border-b border-solid p-5 md:px-0 lg:block">
              <h2 className="text-sm font-bold uppercase text-white">
                Sobre Nós
              </h2>

              <p className="text-justify text-sm text-gray-500">
                {bookingSelected.service.barbershop?.description}
              </p>
            </div>

            {/* CONTATO */}
            <div className="space-y-3 border-b border-solid p-5 md:px-0">
              <h2 className="text-xs font-bold uppercase text-gray-400 lg:text-sm lg:text-white">
                Contato
              </h2>

              {bookingSelected.service.barbershop.phones.map((phone, index) => (
                <PhoneItem key={index} phone={phone} />
              ))}
            </div>

            <div className="mt-5">
              <Badge
                className="w-fit"
                variant={
                  isFuture(bookingSelected.date) ? 'default' : 'secondary'
                }
              >
                {isFuture(bookingSelected.date) ? 'Confirmado' : 'Finalizado'}
              </Badge>

              <div className="mt-3">
                <BookingSummary
                  service={bookingSelected.service}
                  barbershop={bookingSelected.service.barbershop}
                  selectedDate={bookingSelected.date}
                />
              </div>
            </div>

            <div className="w-full">
              <Dialog>
                {isFuture(bookingSelected.date) && (
                  <DialogTrigger asChild>
                    <Button variant="destructive" className="mt-6 w-full">
                      Cancelar Reserva
                    </Button>
                  </DialogTrigger>
                )}
                <DialogContent className="rounded-xl">
                  <DialogHeader>
                    <DialogTitle>Você quer cancelar a sua reserva?</DialogTitle>
                    <DialogDescription>
                      Tem certeza que deseja fazer o cancelamento?
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter className="flex-row gap-3">
                    <DialogClose asChild>
                      <Button variant="secondary" className="w-full">
                        Cancelar
                      </Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button
                        variant="destructive"
                        className="w-full"
                        onClick={() => handleCancelBooking(bookingSelected)}
                      >
                        Confirmar
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
