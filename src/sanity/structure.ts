import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Stayly Management')
    .items([
      S.documentTypeListItem('booking').title('Bookings'),
      S.documentTypeListItem('room').title('Rooms'),
      S.documentTypeListItem('guest').title('Guests'),
      S.divider(),
      S.documentTypeListItem('amenity').title('Amenities'),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['booking', 'room', 'guest', 'amenity'].includes(item.getId()!),
      ),
    ])