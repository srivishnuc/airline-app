import React from 'react'

 
const StaffInFlightDetails = ({flight,name,mealsPreference,services}) =>{
    
return(<>
<ul>
    <li>{flight}</li>
    <li>{name}</li>
    <li>{mealsPreference}</li>
    <li>{services.map((ser,index)=> <span key={index}>{ser}</span>)}</li>
</ul>
</>)
}

export default StaffInFlightDetails
