export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const { prisma } = event.context

    if (!query.q) {
        return await prisma.hotel.findMany()
    }

    return await prisma.hotel.findFirst({
        where: {id: {equals: Number(query.q)}}
    })
})
