import oebb from '~/server/utils/oebb'

export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    return await oebb.stations.search(query.q ?? 'a', { results: 20 })
})
