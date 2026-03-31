import { type SchemaTypeDefinition } from 'sanity'
import { roomType } from './roomType'
import { bookingType } from './bookingType'
import { guestType } from './guestType'
import { amenityType } from './amenityType'
import { blockContent } from './blockContent'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [roomType, bookingType, guestType, amenityType, blockContent],
}