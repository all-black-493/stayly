import {
    defaultShouldDehydrateQuery,
    QueryClient,
    type QueryKey,
    type Query,
} from '@tanstack/react-query'

import { StandardRPCJsonSerializer, type StandardRPCJsonSerializedMetaItem, } from '@orpc/client/standard'

const serializer = new StandardRPCJsonSerializer({
    customJsonSerializers: [],
})

export function createQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                queryKeyHashFn(queryKey: QueryKey) {
                    const [json, meta] = serializer.serialize(queryKey)
                    return JSON.stringify({ json, meta })
                },
                staleTime: 30 * 1000,
            },

            dehydrate: {
                shouldDehydrateQuery: (query: Query) =>
                    defaultShouldDehydrateQuery(query) ||
                    query.state.status === 'pending',

                serializeData(data: unknown) {
                    const [json, meta] = serializer.serialize(data)
                    return { json, meta }
                },
            },

            hydrate: {
                deserializeData(
                    data: {
                        json: unknown;
                        meta: StandardRPCJsonSerializedMetaItem[]
                    }) {
                    return serializer.deserialize(data.json, data.meta)
                },
            },
        },
    })
}