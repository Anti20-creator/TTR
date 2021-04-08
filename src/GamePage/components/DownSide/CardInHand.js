import React, { useEffect, useState } from 'react'
import './CardInHand.css'

function CardInHand({color, count, place}) {

    const [selected, setSelected] = useState(false)

    const makeSelected = (e) => {
        setSelected(!selected)
        if(!selected){
            e.target.closest('.cardInHand').style.transform = 'translate('+ place*-20 + '%, -10%)'
            console.log('kiválasztva')
        }else{
            e.target.closest('.cardInHand').style.transform = 'translate('+ place*-20 + '%, 0%)'
            console.log('kiválasztás vissza')
        }
    }



    return (
        <div 
            className={'cardInHand ' + selected }  
            style={{transform: 'translateX('+ place*-20 +'%)'}}
            onClick={(e) => makeSelected(e)}
            >
            <img src={process.env.PUBLIC_URL + '/Cards/' + color + "CardR.jpg"} alt=""/>
            {count > 1 && <p className="cardCount">{count}</p>}
        </div>
    )
}

export default CardInHand
