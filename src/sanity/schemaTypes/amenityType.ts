import { StarIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const amenityType = defineType({
    name: 'amenity',
    title: 'Amenities',
    type: 'document',
    icon: StarIcon,
    fields: [
        defineField({ name: 'title', type: 'string' }),
        defineField({ name: 'icon', type: 'image' }),
    ],
})