import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic'; 

export default function useEffectPage() {

    const Dina = dynamic(() => import('../../components/dinamic/useEffectComp'), {
        ssr: false,
    });

    const [cantidad, setCantidad] = useState(1);
    
    const [resourceType, setResourceType] = useState(0);

    const [items, setItems] = useState([]);
    

    const [Numero, setNumero] = useState(1);
    const [img, setimg] = useState("");
    
    const [star, setStar] = useState([]);
   

    useEffect(() => {
        resourceType -= 1;
        fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${cantidad}&offset=${resourceType}`)
            .then(response => response.json())
            .then(json => setItems(json))
    }, [resourceType,cantidad]);

    useEffect(()=>{
        setimg( `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${Numero}.png`)
        
        fetch(`https://pokeapi.co/api/v2/pokemon/${Numero}`)
            .then(response => response.json())
            .then(json => setStar(json))
    }),[Numero]

    let cont= resourceType;
    
    const lista = items.results;
    const listaPoke=[];
    for(const i in lista){
        listaPoke.push(lista[i]);
    }
    
    const listaStat = star.stats;
    const listaStar=[];
    for(const i in listaStat){
        listaStar.push(listaStat[i]['base_stat']);
    }

    
    
    return (
    <>
        <h1>Poke no una pokedex XD</h1>
        <div id="padre">
            <div id="dosenuno">
                <div id="hijo1">
                    <form>
                        <p>Cantidad de pokemos a mostrar</p>
                        <input type="text" name="cantidad" onChange={event=> setCantidad(event.target.value)}></input>
                        <p>Numero del primer pokemon para mostrar</p>
                        <input type="text" name="numero" onChange={event=> setResourceType(event.target.value)}></input>
                    </form>
                </div>
                <div id="hijo2">
                    <ul>
                        {listaPoke.map((post)=>(
                            <p onMouseEnter={(e) => setNumero(e.target.id)} id={cont}>{cont++} {post["name"]}</p>
                        ))}               
                    </ul>
                </div>
                
            </div>
        </div>
        <div id="hijo3">
            <div className=" flex justify-center">
                <img src={img}></img>
            </div>
            <h2>Stats</h2>
            <p>Orden: HP, Ataque, Defensa, Ataque Especial, Defensa Especial, Velocidad</p>
            <ul>
                {listaStar.map((stat)=>(
                    <p>{stat}</p>
                ))}
            </ul>
        </div>
    <Dina /> 
    </>
    )}