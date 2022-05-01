import { useState, useEffect } from 'react'
import Layout from "../components/Layout"
import Content from "../components/Content";
import Search from '../components/Search';


export default function Home({pokemons}) {
  const [data, setData] = useState([])
  const [query, setQuery] = useState('')

  useEffect(()=>{
    const updateResult = pokemons.filter((result) => result.name.toLowerCase().includes(query))
    query ? setData(updateResult) : setData([])
  },[query])

  return (
    <Layout title="PokeDex">
      <img className="logo w-full md:w-4/5 mt-8 mx-auto mb-12 max-w-4xl" src="/main.png" alt="text-image" />
      <Search getQuery={setQuery} pokemons={pokemons}/>
      <Content pokemons={pokemons} searchResult = {data}/>
    </Layout>
  )
}


export async function getStaticProps(context) {
  try {
      const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=898&offset=0');
      const { results } = await res.json();
      const pokemons = results.map((pokemon, index) => {
          const paddedId = ('00' + (index + 1)).slice(-3);

          const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId}.png`;
          return { ...pokemon, image };
      });
      return {
          props: { pokemons },
      };
  } catch (err) {
      console.error(err);
  }
}
