import React, {useState} from 'react'

export default function FormulaireProfils({ ajouterProfil}) {
    const [nom,setNom]=useState('');
    const [age,setAge]=useState('');
    const [profession,setProfession]=useState('');
    const [image,setImage]=useState('')
    const  handleSubmit =(event)=>{
        event.preventDefault();
        const nouveauProfil = { nom, age, profession, image };
        ajouterProfil(nouveauProfil);
        setNom('');
        setAge('');
        setProfession('');
        setImage('');
    }

  return (
    <div className='form'>
        <form action=""  onSubmit={handleSubmit}>
        Nom : <input type="text"  name="nom" value={nom} onChange={(e)=>setNom(e.target.value)} className='form-control' /><br />
            Age : <input type="text" name="age" value={age} onChange={(e)=>setAge(e.target.value)} className='form-control' /><br />
            Profession : <input type="text" name="profession" value={profession} onChange={(e)=>setProfession(e.target.value)}  className='form-control' /><br />
            Image : <input type="file"   name="image" accept="image/*" 
                 onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                            setImage(URL.createObjectURL(file));
                        }
                    }} 
        className='form-control' />
            <br />
            <button className='btn btn-success m-3'>Ajouter Profil</button>
        </form>
       
      
    </div>
  )
}
