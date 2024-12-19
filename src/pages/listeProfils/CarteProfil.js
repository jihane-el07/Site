import React from 'react'
import './style.css'; 
import { useEffect } from 'react';


export default function CarteProfil({nom,age,profession,image,onDelete }) {
    const afficherInfo =()=>{
        alert(`Vous avez sélectionné : ${nom}`)
    }
  //   const confirmerSuppression = () => {
  //     const confirmation = window.confirm(`Êtes-vous sûr de vouloir supprimer le profil de ${nom} ?`);
  //     if (confirmation) {
  //         onDelete(); // Supprime si l'utilisateur confirme
  //     }
  // };
  // useEffect(() => {
  //   import('bootstrap/dist/css/bootstrap.min.css');
  // }, []);

  return (
    <div className='card' style={{width:'18rem',margin:'1rem'}}>
        <img src={image}  alt="" className='card-img-top' />
        <div className='card-body'>
            <h5 className='card-title'>{nom}</h5>
            <p className='card-text'> Age: {age} </p>
            <p className='card-text'> Profession: {profession} </p>
            <div className="d-flex justify-content-between">
                    <button className="btn btn-success" onClick={afficherInfo}>Voir Plus</button>
                    <button className="btn btn-danger" onClick={onDelete}>Supprimer</button>
            </div>
        </div>
    </div>
  )
}


