export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const { prisma } = event.context

    const journey = await prisma.journey.findFirstOrThrow({
        where: {uuid: {equals: query.jId}}
    })
    const journeyData = JSON.parse(journey.data)
    const arrivalTime = new Date(journeyData.legs[journeyData.legs.length - 1].arrival)
    const arrivalHour = arrivalTime.getHours()
    const arrivalMinute = arrivalTime.getMinutes()
    const arrivalStation = journey.arrival_station_id

    const boat = await prisma.boat.findFirst({
        where: {hotel_id: {equals: Number(query.hotel_id)}},
    })


    return {
        taxi: await prisma.car.findMany({
            where: {station_id: {equals: arrivalStation}},
            include: {taxi_company: true}
        }),
        hotelTransfer: query.hotel_id ? await prisma.hotelTransfer.findFirst({
            where: {hotel_id: {equals: Number(query.hotel_id)}},
        }) : null,
        boats: !!boat ? {
            price: boat.price,
            departures: JSON.parse(boat.times).filter((time:any) => {
                const timeHour = Number(time.split(':')[0])
                const timeMinute = Number(time.split(':')[1])
                return timeHour > arrivalHour || (timeHour === arrivalHour && timeMinute > arrivalMinute)
            })
        } : null,
        bus: await prisma.busTime.findMany({
            where: {
                AND: {
                    hotel_id: {equals: Number(query.hotel_id)},
                    OR: [
                        {hour: { gt: arrivalHour }},
                        {AND: [{ hour: arrivalHour }, { minute: { gt: arrivalMinute }}],},
                    ],
                }
            },
        })

    }
})
