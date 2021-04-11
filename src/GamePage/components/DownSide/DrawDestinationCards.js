import React from 'react'
import './DrawDestinationCards.css'
import DestinationCard from './DestinationCard'
import { ticketToRideData } from '../../../mapdata/MapData.js'
import { Button } from '@material-ui/core'

function DrawDestinationCards({clickEvent}) {

    return (
        <div className="drawDestinationCards">
            {Array.from(Array(3).keys()).map(i => {
                return  <DestinationCard 
                            from={ticketToRideData.destinations[i+1].fromCity}
                            to={ticketToRideData.destinations[i+1].toCity}
                            points={ticketToRideData.destinations[i+1].value} />
                
            })}
            <Button variant="contained" color="primary" onClick={clickEvent} >
                Kész
            </Button>
        </div>
    )
}

export default DrawDestinationCards
