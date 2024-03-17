

// export const PokemonAPI = async (pokemon: any) => {
//     const promise = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
//     const data = await promise.json();
//     return data;
// }

export const PokemonAPI = async (pokemon: any) => {
    const promise = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    const data = await promise.json();
    return data;
}