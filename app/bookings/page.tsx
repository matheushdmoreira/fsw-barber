import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'

import { authOptions } from '../_lib/auth'

import { getConfirmedBookings } from '../_data/get-confirmed-bookings'
import { getConcludedBookings } from '../_data/get-concluded-bookings'
import { Metadata } from 'next'
import { BookingsList } from '../_components/bookings-list'
import { Header } from '../_components/header'

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
        confirmedBookings={confirmedBookings}
        concludedBookings={concludedBookings}
      />
    </>
  )
}
