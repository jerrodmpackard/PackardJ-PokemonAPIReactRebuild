import React, { useEffect, useState } from 'react'
import { PokemonAPI } from '../DataServices/DataServices'
import { Ability, IPokemon, Move, Type } from '../Interfaces/IPokemon'
import { ISpecies, FlavorTextEntry } from '../Interfaces/ISpecies'
import heart from '../Assets/heart.png'
import heartFull from '../Assets/heart-fill.png'
import { Button, Modal } from 'flowbite-react'

const HomePageComponent = () => {

    let defaultImg;
    let shinyImg;

    const [pokemonInput, setPokemonInput] = useState<string | number>('');
    const [searchPokemon, setSearchPokemon] = useState<string | number>('pikachu');
    const [pokemonName, setPokemonName] = useState<string>('');
    const [pokemonID, setPokemonID] = useState<number>(1);
    const [pokemonImage, setPokemonImage] = useState<string>('');
    const [pokemonMoves, setPokemonMoves] = useState<string>('');
    const [type, setType] = useState<string>('');
    const [pokemonAbilities, setPokemonAbilities] = useState<string>('');
    const [pokemonLocation, setPokemonLocation] = useState<string>('');
    const [pokemonDescription, setPokemonDescription] = useState<string>('');
    const [pokemonEvolution, setPokemonEvolution] = useState<string>('');

    const handleSearch = () => {
        if (pokemonInput) {
            setSearchPokemon(pokemonInput);
        }
    }

    const handleRandom = () => {
        const randomNum = Math.floor(Math.random() * 649);
        if (randomNum) {
            setSearchPokemon(randomNum);
        }
    };

    useEffect(() => {
        const getData = async () => {
            const pokemon = await PokemonAPI(searchPokemon);
            if (pokemon.id > 649) {
                alert('Only Pokemon from Generations 1-5 are supported at this time. Please search for a Pokemon with an ID between 1 and 649l');
            } else {


                let name = pokemon.name[0].toUpperCase() + pokemon.name.substring(1);
                setPokemonName(name.split('-').join(' '));
                setPokemonID(pokemon.id);
                defaultImg = pokemon.sprites.other["official-artwork"].front_default;
                shinyImg = pokemon.sprites.other["official-artwork"].front_shiny;
                setPokemonImage(defaultImg);
                setPokemonMoves(pokemon.moves.map((move: Move) => move.move.name).join(", "));
                setType(pokemon.types.map((element: Type) => element.type.name).join(", "));
                setPokemonAbilities(pokemon.abilities.map((ability: Ability) => ability.ability.name).join(", "));

                const loc = await fetch(pokemon.location_area_encounters);
                const location = await loc.json();
                if (location.length === 0) {
                    setPokemonLocation("N/A");
                } else {
                    setPokemonLocation(location[0].location_area.name.split("-").join(" "));
                }

                const desc = await fetch(pokemon.species.url);
                const description = await desc.json();
                const english = description.flavor_text_entries.findIndex((name: FlavorTextEntry) => name.language.name === "en");
                setPokemonDescription(description.flavor_text_entries[english].flavor_text);

                const evol = description.evolution_chain.url;
                const evolve = await fetch(evol);
                const evolution = await evolve.json();
                // setPokemonEvolution(evolution.chain.species.name + " > " + evolution.chain.evolves_to[0].species.name + " > " + evolution.chain.evolves_to[0].evolves_to[0].species.name);
            }
        }
        getData();
    }, [searchPokemon])

    return (
        <div>
            {/* Drawer Component */}
            <div id="drawer-example"
                className="fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform -translate-x-full bg-white w-80 dark:bg-gray-800"
                tabIndex={-1} aria-labelledby="drawer-label">
                <h5 id="drawer-label"
                    className="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400"><svg
                        className="w-4 h-4 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                        viewBox="0 0 20 20">
                        <path
                            d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>Favorites</h5>
                <button type="button" data-drawer-hide="drawer-example" aria-controls="drawer-example"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                    <span className="sr-only">Close menu</span>
                </button>

                <p id="favoritesDiv" className="mb-6 text-sm text-gray-500 dark:text-gray-400">
                </p>

            </div>


            {/* Top Container for title, search, and buttons */}
            <div className="container mx-auto px-6">
                <h1 className="text-6xl lg:text-8xl text-white text-center pt-10 mb-5">Pokédex</h1>

                <div className="flex flex-wrap justify-center">
                    <input value={pokemonInput} onChange={(e) => setPokemonInput(e.target.value)} type="text" placeholder="Search Pokémon name or ID number"
                        className="w-52 h-10 me-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    <button onClick={handleSearch}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Search</button>
                    <button id="favoritesMenuBtn" type="button" data-drawer-target="drawer-example" data-drawer-show="drawer-example"
                        aria-controls="drawer-example"
                        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Favorites</button>
                    <button onClick={handleRandom} type="button"
                        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Random</button>
                </div>
            </div>
            {/* End of Top Container */}

            {/* Main Container for Pokemon content */}
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-4 gap-20">
                    {/* Left Half Div */}
                    <div className="col-span-4 lg:col-span-2 mx-auto">
                        <div className="flex items-baseline justify-center my-10 bg-zinc-300/75 rounded-lg p-5">
                            <h2 className="text-white text-3xl lg:text-5xl">#{pokemonID}</h2>
                            <h2 className="text-white text-3xl lg:text-5xl px-5">{pokemonName}</h2>
                            <img src={heart} alt="heart button" />
                        </div>
                        <img src={pokemonImage} alt="pokemon" />
                    </div>

                    {/* Right Half Div */}
                    <div className="col-span-4 lg:col-span-2">
                        <div className="mt-10 bg-zinc-300/75 rounded-lg p-5">
                            <p className="text-white text-2xl lg:text-3xl">{pokemonDescription}</p>
                        </div>

                        <div className="grid grid-cols-3 bg-zinc-300/75 rounded-lg mt-5 p-5">
                            <p className="text-white text-2xl lg:text-3xl">Type:</p>
                            <p className="col-span-2 text-white text-2xl lg:text-3xl">{type}</p>
                        </div>

                        <div className="grid grid-cols-3 bg-zinc-300/75 rounded-lg mt-5 p-5">
                            <p className="text-white text-2xl lg:text-3xl">Location:</p>
                            <p className="col-span-2 text-white text-2xl lg:text-3xl">{pokemonLocation}</p>
                        </div>

                        <div className="grid grid-cols-3 bg-zinc-300/75 rounded-lg mt-5 p-5">
                            <p className="text-white text-2xl lg:text-3xl">Abilities:</p>
                            <p className="col-span-2 text-white text-2xl lg:text-3xl">{pokemonAbilities}</p>
                        </div>

                        <div className="grid grid-cols-3 bg-zinc-300/75 rounded-lg mt-5 p-5 h-44 ">
                            <p className="text-white text-2xl lg:text-3xl">Moves:</p>
                            <p className="col-span-2 overflow-x-scroll text-white text-2xl lg:text-3xl">
                                {pokemonMoves}
                            </p>
                        </div>

                        <div className="bg-zinc-300/75 rounded-lg mt-5 mb-10 p-5">
                            <p className="text-white text-2xl lg:text-3xl">Evolutions:</p>
                            <p className="text-white text-2xl lg:text-3xl text-center">{pokemonEvolution}</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* End of Main Container */}
        </div>
    )
}

export default HomePageComponent
