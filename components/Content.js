import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "./Card";


const Content = ({ pokemons: data , searchResult}) => {
    const [pokemons, setPokemons] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    // Initial Render
    useEffect(()=>{
      searchResult.length ? setPokemons(searchResult.slice(0, 25)) : setPokemons(data.slice(0,25))
    },[searchResult])

    // const getMorePokemons = async () => {
    //     const endpoint = pokemons.length === 875 ? 
    //     `https://pokeapi.co/api/v2/pokemon?limit=23&offset=${pokemons.length}` :
    //     `https://pokeapi.co/api/v2/pokemon?limit=25&offset=${pokemons.length}`
    //   const res = await fetch(
    //     endpoint
    //   );
    //   const { results } = await res.json();
    //   const newPokemons = results.map((pokemon, index) => {
    //     const paddedId = ('00' + (pokemons.length + (index + 1))).slice(-3);
    //     const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId}.png`;
    //     return { ...pokemon, image };
    // });
    //     setPokemons((prevPokemons) => [...prevPokemons, ...newPokemons]);
    //     {pokemons.length === 875 && setHasMore(false)}
    // };

    const getMorePokemons = () => {
      let newPokemons = []
      if (searchResult.length){
        pokemons.length > searchResult.length && setHasMore(false)
        newPokemons = searchResult.slice(pokemons.length, pokemons.length + 25)
      }else{
        pokemons.length > data.length && setHasMore(false)
        newPokemons = data.slice(pokemons.length, pokemons.length + 25)
      }
      setPokemons((prevPokemons) => [...prevPokemons, ...newPokemons]);
    };
  
    return (
      <>
        <InfiniteScroll
          dataLength={pokemons.length}
          next={getMorePokemons}
          hasMore={hasMore}
        >
            <div className="container-cards grid grid-cols-2 gap-12 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {pokemons.map((pokemon, index)=>(
                  <Card 
                    key={index}
                    image={pokemon.image}
                    name={pokemon.name}
                  />
                ))}
            </div>
        </InfiniteScroll>
      </>
    );
  };
  
  export default Content;