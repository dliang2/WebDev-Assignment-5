import React from 'react'

export const City = ({ City, State, Lat, Long, EstimatedPopulation, TotalWages }) => {
    return (
      <div className="card mt-2 mb-3">
        <div className="card-header">
          <strong> {City} </strong>
        </div>
        <div className="card-body">
            <ul>
                <li>City: {City}</li>
                <li>State: {State}</li>
                <li>Location: {Lat}, {Long}</li>
                <li>Estimated Population: {EstimatedPopulation}</li>
                <li>Total Wages: ${TotalWages}</li>
            </ul>
        </div>
      </div>
    )
}
