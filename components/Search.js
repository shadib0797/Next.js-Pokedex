import { useRef, useState, useEffect } from 'react'

export default function Search({getQuery, pokemons}) {
  const searchRef = useRef(null)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(false)
  const [results, setResults] = useState([])
  const [persistedData, setPersistedData] = useState([])
  const [displayPersistedData, setDisplayPersistedData] = useState(false);

  function writeToLoacalStorage(item){
    const getSearchData = localStorage.getItem("searchData")
    let searchData = []
    if(!getSearchData){
      searchData.push(item)
    }else{
      searchData = JSON.parse(getSearchData)
      searchData.push(item)
    }
    localStorage.setItem("searchData", JSON.stringify(searchData))
  }

  useEffect(()=>{
    const updateResult = pokemons.filter((result) => result.name.toLowerCase().includes(query))
    query ? setResults(updateResult) : setResults([])
  },[query])

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const handleClickOutside = event => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
        setActive(false)
        setDisplayPersistedData(false)
      }
  };

  const handleChange = (event) => {
      query ? setDisplayPersistedData(false) : setDisplayPersistedData(true)
      setQuery(event.target.value)
      getQuery(event.target.value)
      query ? setActive(true) : setActive(false)
  }

  const updatePokeDex = pokemon => {
    setQuery(pokemon);
    getQuery(pokemon)
    writeToLoacalStorage(pokemon)
    setActive(false);
  };

  const handleFocus = () => {
    if(localStorage.getItem("searchData")){
      setPersistedData(JSON.parse(localStorage.getItem("searchData")))
      setDisplayPersistedData(true)
    }
  }

  return (
    <div
    className='container-search-bar mb-8 mx-auto w-full md:w-4/5 relative max-w-3xl drop-shadow-md z-10'
    ref={searchRef}
  >
    <img className="search-icon absolute top-3.5 left-4 w-8" src="/search-icon.svg" alt="search-icon" />
    <input
      className='search-bar border-none w-full p-4 pl-8 rounded-full text-center text-lg focus:outline-none focus:rounded-2xl'
      onChange={handleChange}
      placeholder='Type to search ...'
      onFocus={handleFocus}
      type='text'
      value={query}
    />
    {active && query &&
      <ul className='result-list bg-white absolute w-full top-12 max-h-48 pt-4 pb-2 rounded-b-lg overflow-auto no-scrollbar'>
        {results
          .slice(0, 15)
          .map((result, index) => (
              <li 
                className='p-2 pl-8 text-base'
                key={index} 
                onClick={() => updatePokeDex(result.name)} 
                tabIndex="0">
                  {result.name}
              </li>
          ))}
      </ul>
    }
    { displayPersistedData && persistedData &&
      <ul className='result-list-local bg-white absolute w-full top-12 max-h-48 pt-4 pb-2 rounded-b-lg overflow-auto no-scrollbar'>
        {persistedData
          .slice(0, 15)
          .map((result, index) => (
              <li 
                className='p-2 pl-8 text-base'
                key={index} 
                onClick={() => updatePokeDex(result)} 
                tabIndex="0">
                  {result}
              </li>
          ))}
      </ul>
     }
  </div>
  )
}