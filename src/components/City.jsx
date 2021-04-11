import React from 'react'

export const City = ({ City, State, Lat, Long, EstimatedPopulation, TotalWages }) => {
    return (
        <div>
            <ul>
                <li>City: {City}</li>
                <li>State: {State}</li>
                <li>Location: {Lat}, {Long}</li>
                <li>Estimated Population: {EstimatedPopulation}</li>
                <li>Total Wages: ${TotalWages}</li>
            </ul>
        </div>
    )
}
