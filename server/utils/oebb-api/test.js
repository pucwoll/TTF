const oebb = require('./oebb.js');

oebb.searchStationsNew("Wien Hbf").then((res)=>{
    var from = res[0];
    oebb.searchStationsNew("Venezia Santa Lucia").then((res)=>{
        var to=res[0];
        oebb.getJourneys(from, to, true).then((res)=>{
            console.log(JSON.stringify(res));
        });
    })
});

function journeys(origin, destination, date = new Date(), opt = {}){
    const options = opt;

    const auth = oebb.getAuthentication();

    // const action = actions.travelActions.find((x) => x.subtitle.de === 'Einzeltickets und Tageskarten') // todo
    // if(!action) throw new Error('invalid actions returned')

    return auth.then(oebb.postRequest('https://tickets.oebb.at/api/hafas/v4/timetable', {
        // "travelActionId": action.id,
        "reverse": false,
        "datetimeDeparture": new Date(date),
        "filter": {
            "regionaltrains": false,
            "direct": false,
            "changeTime": false,
            "wheelchair": false,
            "bikes": false,
            "trains": false,
            "motorail": false,
            "droppedConnections": false
        },
        "passengers": [
            {
                "type": "ADULT",
                "id": 1509169236,
                "me": false,
                "remembered": false,
                "challengedFlags": {
                    "hasHandicappedPass": false,
                    "hasAssistanceDog": false,
                    "hasWheelchair": false,
                    "hasAttendant": false
                },
                "relations": [],
                "cards": [],
                "birthdateChangeable": true,
                "birthdateDeletable": true,
                "nameChangeable": true,
                "passengerDeletable": true
            }
        ],
        "count": 5, // must be <= 5
        "debugFilter": {
            "noAggregationFilter": false,
            "noEqclassFilter": false,
            "noNrtpathFilter": false,
            "noPaymentFilter": false,
            "useTripartFilter": false,
            "noVbxFilter": false,
            "noCategoriesFilter": false
        },
        "from": {
            "number": origin
        },
        "to": {
            "number": destination
        },
        "timeout": {}
    }));
}

//authentication.then(oebb.getRequest("https://tickets.oebb.at/api/hafas/v1/stations", {count: 10, name:"Wien"})).then(console.log);
/*const stations = (query, opt = {}) => {
    if(!query || !isString(query)){
        throw new Error('missing or invalid `query` parameter')
    }
    const options = merge(defaults, opt)
    return h.auth()
        .then(h.get('https://tickets.oebb.at/api/hafas/v1/stations', {
            // count: options.results,
            count: 10, // option seems to be disabled server-side
            name: query || null
        }))
        .then((res) => res.map(createStation))
}

/*var stations = {from:null,to:null};
var optionFrom = oebb.getStationSearchOptions();
var optionTo = oebb.getStationSearchOptions();
optionFrom.S = process.argv[2];
optionTo.S = process.argv[3];
oebb.searchStation(optionFrom)
.then((result)=>{stations.from=result[0]; oebb.searchStation(optionTo)
.then((result)=>{stations.to=result[0]; setInterval(test, 60*1000)})});



function test(){
	var dt = datetime.create();
	var options = oebb.getStationBoardDataOptions();
	options.evaId = stations.from.extId;
	options.dirInput = stations.to.extId;
	oebb.getStationBoardData(options).then(test2)
}

function test2(info){
	var dt = datetime.create();
	var interessantes = oebb.getDelayed(info);
	if(interessantes.delayed.length > 0){
		console.log('\x1b[32m%s\x1b[0m', dt.format("d/m/Y H:M") + " delayed:");
		console.log(interessantes.delayed);
	}if(interessantes.canceled.length > 0){
		console.log('\x1b[36m%s\x1b[0m', dt.format("d/m/Y H:M") + " canceled:");
		console.log(interessantes.canceled);
	}
}*/