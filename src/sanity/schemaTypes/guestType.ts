import { UsersIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const guestType = defineType({
    name: 'guest',
    title: 'Guests',
    type: 'document',
    icon: UsersIcon,
    fields: [
        defineField({ name: 'name', type: 'string' }),
        defineField({ name: 'email', type: 'string' }),
        defineField({ name: 'phone', type: 'string' }),
        defineField({ 
            name: 'clerkUserId', 
            type: 'string', 
            title: 'Clerk User ID',
            description: 'The unique ID from Clerk to link this guest to their account'
        }),
        defineField({ 
            name: 'idNumber', 
            type: 'string', 
            title: 'ID/Passport Number' 
        }),
        defineField({
            name: 'frontIdImage',
            type: 'image',
            title: 'Front of ID',
            options: { hotspot: true }
        }),
        defineField({
            name: 'backIdImage',
            type: 'image',
            title: 'Back of ID',
            options: { hotspot: true }
        }),
        defineField({
            name: 'verificationStatus',
            type: 'string',
            title: 'Verification Status',
            options: {
                list: [
                    { title: 'Pending', value: 'pending' },
                    { title: 'Verified', value: 'verified' },
                    { title: 'Rejected', value: 'rejected' }
                ],
                layout: 'radio'
            },
            initialValue: 'pending'
        }),
    ],
})