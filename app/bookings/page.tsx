import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getServerSession } from 'next-auth'

import { BookingsList } from '../_components/bookings-list'
import { Header } from '../_components/header'
import { getConcludedBookings } from '../_data/get-concluded-bookings'
import { getConfirmedBookings } from '../_data/get-confirmed-bookings'
import { authOptions } from '../_lib/auth'

export const metadata: Metadata = {
  title: 'FSW Barber - Agendamentos',
}

export default async function BookingsPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return notFound()
  }

  const confirmedBookings = await getConfirmedBookings()
  const concludedBookings = await getConcludedBookings()

  return (
    <>
      <Header />

      <BookingsList
        confirmedBookings={JSON.parse(JSON.stringify(confirmedBookings))}
        concludedBookings={JSON.parse(JSON.stringify(concludedBookings))}
      />
    </>
  )
}
