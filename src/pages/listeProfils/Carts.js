// import logo from './logo.svg';
// import './App.css';
import ListeProfils from './ListeProfils';
import FormulaireProfils from './FormulaireProfils';
import { useState,useEffect } from 'react';



function Carts() {
  const [profils,setProfils]=useState([{nom:'Alice',age:25,profession:'Développeuse',image: "/imageList/image1.jpg"},{nom:'Bob',age:27,profession:'Designer',image: "/imageList/image1.jpg"}]);
  // Load profiles from Local Storage when the app starts
  useEffect(() => {
    const profilsSauvegardes = localStorage.getItem('profils');
    if (profilsSauvegardes) {
        setProfils(JSON.parse(profilsSauvegardes)); // Restore profiles
    }
}, []);

// Save profiles to Local Storage whenever the profiles change
useEffect(() => {
    localStorage.setItem('profils', JSON.stringify(profils)); // Save profiles
}, [profils]);

  const  ajouterProfil =(profil)=>{
  const nouveauxProfils = [...profils, profil];
    setProfils(nouveauxProfils);
  
  }

  const supprimerProfil = (index) => { 
    const nouveauxProfils = profils.filter((profil, i) => i !== index); 
    setProfils(nouveauxProfils); 
    }; 
 
   
  return (
    <div className="app">
      <h1 className='text-center my-4'>Liste des Profils</h1>
      <FormulaireProfils ajouterProfil={ajouterProfil} />
      <ListeProfils profils={profils} supprimerProfil={supprimerProfil} />
      
    </div>
  );
}

export default Carts;
