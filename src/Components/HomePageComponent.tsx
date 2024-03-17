import React, { useEffect, useState } from 'react'
import { PokemonAPI } from '../DataServices/DataServices'
import { IPokemon } from '../Interfaces/IPokemon';

const HomePageComponent = () => {

    let pokeName: any;

    const [pokemon, setPokemon] = useState<IPokemon>();

    useEffect(() => {
        const getData = async () => {
            const pokeData = await PokemonAPI('ditto');
            console.log(pokeData);
        }
        getData();
    }, [])

    return (
        <div>

        </div>
    )
}

export default HomePageComponent
