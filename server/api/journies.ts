import oebb from '~/server/utils/oebb'

export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const {prisma} = event.context

    if (!query.from || !query.to) {
        return []
    }

    const when = query.when ? new Date(query.when.toString()) : new Date()

    const data = await oebb.journeys(query.from, query.to, {when, results: Number(query.results ?? 10)})

    // saving because of the weird oebb api
    const existingJourneys = (await prisma.journey.findMany({
        where: {
            uuid: {in: data.map((journey: any) => journey.id)}
        },
    })).map((journey:any) => journey.uuid)



    await prisma.journey.createMany({
        data: data.filter((journey:any) => !existingJourneys.includes(journey.id)).map((journey: any) => ({
                uuid: journey.id,
                data: JSON.stringify(journey),
                arrival_station_id: query.to,
            }),
        ),
    })

    return data
})
