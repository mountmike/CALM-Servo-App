import { getDistanceFromLatLon } from "./distance_to_map_center.js";
import { renderServoList } from "./servo_list.js";
import { fetchServos, fetchFuelPrice } from "../servo_api.js"
import { setCenterExport } from "../client.js"





export function nearestList(centerLat, centerLon){

    let totalStationArr = []
    let outputArr = []

    fetchServos()
    .then(stations => {
        // console.log(stations)
        let distanceArr = []

        stations.forEach(station => {

            let distanceToCenter = Math.floor(getDistanceFromLatLon(centerLat, centerLon, Number(station.latitude), Number(station.longitude)))
            // console.log(distanceToCenter)

            let pairArr = []

            let currentPrice = fetchFuelPrice()
            
            pairArr.push(distanceToCenter, station.station_owner, station.station_name, station.station_address, station.latitude, station.longitude, currentPrice)

            distanceArr.push(distanceToCenter)

            totalStationArr.push(pairArr)     
        
        })
        return distanceArr.sort(function(a, b) { return a - b }).slice(0, 10)
    })
    .then(sortInOrderArr => {

        sortInOrderArr.forEach(distance => {
            totalStationArr.forEach(station =>{
                if(station[0] === distance){
                    outputArr.push(station)
                }
            })
        })
        return outputArr
    })
    .then(res =>renderServoList(res))
    .then(() => outputArr.splice(0, 10))
    .then(() => {
        // hook onto each of the nearest stations
        const nearestDirect = document.querySelectorAll(".nearest-station-name")

        // adding the event listener to setting the map into the center
        nearestDirect.forEach((station) => {
            station.addEventListener("click", (event) => {
                if (event) {
                    event.preventDefault()
                }
                console.log(event.target.dataset)
                setCenterExport(event.target.dataset)
            })
        })
    })
}