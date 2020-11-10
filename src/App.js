import Axios from 'axios'
import React, { useEffect, useState } from 'react'
function App() {
  const [state, setState] = useState([])
  const [query, setQuery] = useState(null)
  //const lastDeathUpdate = state[state.length - 1].Deaths;
  useEffect(() => {
    async function fetchData() {
      const req = await Axios.get(`https://api.covid19api.com/total/country/${query}`)
      setState(req.data)
      return req
    }
    fetchData();
  },[query])
  function handleFilterByStates() {

  }
  return (
    <div cl assName="App">  
      <button>Estatos</button>    
      <h1>O numero de mortos no </h1>
      {state.map(e => (
        <li>{e.Country}</li>
      ))}
    </div>
  );
}

export default App;
