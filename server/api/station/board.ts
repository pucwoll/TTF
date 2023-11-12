
import oebb from '~/server/utils/oebb-api/oebb'

export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    if (!query.sId) {
        return []
    }

    let response;

    try {
        let options = oebb.getStationBoardDataOptions()
        options.evaId = String(query.sId)
        await oebb.getStationBoardData(options).then((e) => {
            response  = e
        });
    } catch (e) {
        response = e
    }
    return response
})
