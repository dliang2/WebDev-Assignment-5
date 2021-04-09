import React from 'react'

export const City = ({ City, State, EstimatedPopulation, TotalWages }) => {
    return (
        <div>
            <ul>
                <li>City: {City}</li>
                <li>State: {State}</li>
                <li>Estimated Population: {EstimatedPopulation}</li>
                <li>Total Wages: ${TotalWages}</li>
            </ul>
        </div>
    )
}
