import React, { useState } from 'react'
import CarteProfil from './CarteProfil'

export default function ListeProfils({ profils, supprimerProfil }) {
  return (
    <div className='d-flex flex-wrap justify-content-center'>
       {profils.map((profil, index) => ( 
        <div key={index}> 
        <CarteProfil 
        nom={profil.nom} 
        age={profil.age} 
        profession={profil.profession} 
        image={profil.image} 
        onDelete={() => supprimerProfil(index)}
        /> 
       
        </div> 
        ))}
      
    </div>
  )
}
