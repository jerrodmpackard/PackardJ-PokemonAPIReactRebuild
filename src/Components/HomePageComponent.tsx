import React, { useEffect, useState } from 'react'
import { PokemonAPI } from '../DataServices/DataServices'
import { IPokemon } from '../Interfaces/IPokemon'
import Bulbasaur from '../Assets/1.png'
import heart from '../Assets/heart.png'
import heartFull from '../Assets/heart-fill.png'

const HomePageComponent = () => {

    let pokeName: any;

    const [pokemon, setPokemon] = useState<IPokemon>();
    const [pokemonName, setPokemonName] = useState<IPokemon>();

    useEffect(() => {
        const getData = async () => {
            const pokeData = await PokemonAPI('ditto');
            console.log(pokeData);
        }
        getData();
    }, [])

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
                <h1 className="text-6xl lg:text-8xl text-white text-center mt-10 mb-5">Pokédex</h1>

                <div className="flex flex-wrap justify-center">
                    <input id="inputField" type="text" placeholder="Search Pokémon name or ID number"
                        className="w-52 h-10 me-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    <button id="searchBtn" type="button"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Search</button>
                    <button id="favoritesMenuBtn" type="button" data-drawer-target="drawer-example" data-drawer-show="drawer-example"
                        aria-controls="drawer-example"
                        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Favorites</button>
                    <button id="randomBtn" type="button"
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
                            <h2 id="pokemonID" className="text-white text-3xl lg:text-5xl">#1</h2>
                            <h2 id="pokemonName" className="text-white text-3xl lg:text-5xl px-5">Bulbasaur</h2>
                            <img id="heartBtn" src={heart} alt="heart button" />
                        </div>
                        <img id="pokemonImg" src={Bulbasaur} alt="pokemon" />
                    </div>

                    {/* Right Half Div */}
                    <div className="col-span-4 lg:col-span-2">
                        <div className="mt-10 bg-zinc-300/75 rounded-lg p-5">
                            <p id="pokemonDescription" className="text-white text-2xl lg:text-3xl">A strange seed was planted on its back at birth. The plant sprouts and grows with this Pokémon.</p>
                        </div>

                        <div className="grid grid-cols-3 bg-zinc-300/75 rounded-lg mt-5 p-5">
                            <p className="text-white text-2xl lg:text-3xl">Type:</p>
                            <p id="pokemonType" className="col-span-2 text-white text-2xl lg:text-3xl">grass, poison</p>
                        </div>

                        <div className="grid grid-cols-3 bg-zinc-300/75 rounded-lg mt-5 p-5">
                            <p className="text-white text-2xl lg:text-3xl">Location:</p>
                            <p id="pokemonLocation" className="col-span-2 text-white text-2xl lg:text-3xl">cerulean city area</p>
                        </div>

                        <div className="grid grid-cols-3 bg-zinc-300/75 rounded-lg mt-5 p-5">
                            <p className="text-white text-2xl lg:text-3xl">Abilities:</p>
                            <p id="pokemonAbilities" className="col-span-2 text-white text-2xl lg:text-3xl">overgrow, chlorophyll</p>
                        </div>

                        <div className="grid grid-cols-3 bg-zinc-300/75 rounded-lg mt-5 p-5 h-44 ">
                            <p className="text-white text-2xl lg:text-3xl">Moves:</p>
                            <p id="pokemonMoves" className="col-span-2 overflow-x-scroll text-white text-2xl lg:text-3xl">razor wind, swords dance, cut, bind, vine whip, headbutt, tackle, body slam, take down, double edge, growl, strength, mega drain, leech seed, growth, razor leaf, solar beam, poison powder, sleep powder, petal dance, string shot, toxic, rage, mimic, double team, defense curl, light screen, reflect, bide, sludge, skull bash, amnesia, flash, rest, substitute, snore, curse, protect, sludge bomb, mud slap, outrage, giga drain, endure, charm, false swipe, swagger, fury cutter, attract, sleep talk, return, frustration, safeguard, sweet scent, synthesis, hidden power, sunny day, rock smash, facade, nature power, helping hand, ingrain, knock off, secret power, weather ball, grass whistle, bullet seed, magical leaf, natural gift, worry seed, seed bomb, energy ball, leaf storm, power whip, captivate, grass knot, venoshock, acid spray, round, echoed voice, grass pledge, work up, grassy terrain, confide, grassy glide, tera blast, trailblaze</p>
                        </div>

                        <div className="bg-zinc-300/75 rounded-lg mt-5 mb-10 p-5">
                            <p className="text-white text-2xl lg:text-3xl">Evolutions:</p>
                            <p id="pokemonEvolutions" className="text-white text-2xl lg:text-3xl text-center">Evolutions</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* End of Main Container */}
        </div>
    )
}

export default HomePageComponent
