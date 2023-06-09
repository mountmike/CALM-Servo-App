// import axios from "axios"

export function fetchServos () {
    return axios.get("/api/stations/all").then(res => res.data)
        // console.log(res.data)
}

export function findOneRandomly () {
    return axios.get("/api/stations/random").then(res)
}

export function fetchServoStats() {
    return axios.get("/api/stats").then(res => res.data)
}

export function fetchServosWithin (coordinate) {
    return axios.post("/api/stations/bounds",  coordinate )
        .then(res => res.data)
}

export function fetchServosWithinRadius (coordObj) {
    return axios.post("/api/stations/nearest", coordObj)
        .then(res => res.data)
}

export function fetchFuelPrice() {
    return (Math.random() * (2 - 1.5) + 1.5).toFixed(2)
}