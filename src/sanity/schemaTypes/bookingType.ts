import { CalendarIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const bookingType = defineType({
    name: 'booking',
    title: 'Bookings',
    type: 'document',
    icon: CalendarIcon,
    fields: [
        defineField({ name: 'guest', type: 'reference', to: [{ type: 'guest' }] }),
        defineField({ name: 'room', type: 'reference', to: [{ type: 'room' }] }),
        defineField({ name: 'checkIn', type: 'date', title: 'Check-in Date' }),
        defineField({ name: 'checkOut', type: 'date', title: 'Check-out Date' }),
        defineField({
            name: 'status',
            type: 'string',
            options: {
                list: ['pending', 'confirmed', 'cancelled', 'checked-out'],
            },
            initialValue: 'pending'
        }),
    ],
})