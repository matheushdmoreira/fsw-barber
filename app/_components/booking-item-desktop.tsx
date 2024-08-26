'use client'

import { Prisma } from '@prisma/client'
import { BookingItemCard } from './booking-item-card'

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
  onChangeBooking?: (
    booking: Prisma.BookingGetPayload<{
      include: {
        service: {
          include: {
            barbershop: true
          }
        }
      }
    }>,
  ) => void
}

export function BookingItemDesktop({
  booking,
  onChangeBooking,
}: BookingItemProps) {
  return (
    <>
      {onChangeBooking && (
        <button
          type="button"
          className="hidden w-full min-w-[90%] lg:block"
          onClick={() => onChangeBooking(booking)}
        >
          <BookingItemCard booking={booking} />
        </button>
      )}
    </>
  )
}
