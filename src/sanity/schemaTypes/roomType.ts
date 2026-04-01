import { HomeIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const roomType = defineType({
    name: 'room',
    title: 'Rooms',
    type: 'document',
    icon: HomeIcon,
    fields: [
        defineField({
            name: 'clerkOrgId',
            type: 'string',
            title: 'Clerk Organization ID',
            readOnly: true,
            validation: (Rule) => Rule.required(),
        }),
        defineField({ name: 'name', type: 'string', title: 'Room Name/Number' }),
        defineField({ name: 'slug', type: 'slug', options: { source: 'name' } }),
        defineField({
            name: 'type',
            type: 'string',
            options: {
                list: ['Single', 'Double', 'Suite', 'Deluxe'],
                layout: 'radio'
            }
        }),
        defineField({ name: 'price', type: 'number', title: 'Price per Night' }),
        defineField({ name: 'capacity', type: 'number', title: 'Max Guest Capacity' }),
        defineField({
            name: 'amenities',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'amenity' }] }]
        }),
        defineField({
            name: 'images',
            type: 'array',
            of: [{ type: 'image', options: { hotspot: true } }]
        }),
        defineField({ name: 'description', type: 'blockContent' }),
    ],
})