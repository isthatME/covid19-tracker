import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../home/style.css'
import { FaSkull, FaCheck } from "react-icons/fa";
import { GiLifeBar } from "react-icons/gi";

function Index() {
    const [state, setState] = useState([])

    useEffect(() => {
        async function fetchData() {
            const req = await Axios.get('https://covid19-brazil-api.now.sh/api/report/v1/countries')
            setState(req.data.data)
            return req
        }
        fetchData();
    }, [])

    return (
        <div cl assName="App">
            <h1>Estatistica em alguns estados</h1>
            {state.filter(e => e.country === 'Brazil' || e.country === 'Italy' || e.country === 'China').map(filteredCountry => (
                <div className="country-card">
                    <div className="country-stats">
                        <h1>Covid no {filteredCountry.country}</h1>
                        <div className="country-stats-wrapper">
                            <p>
                                <FaCheck></FaCheck>
                                {filteredCountry.cases}
                                </p>
                            <p>
                                <GiLifeBar></GiLifeBar>
                                {filteredCountry.recovered}
                            </p>
                            <p>
                                <FaSkull></FaSkull>
                                {filteredCountry.deaths}
                            </p>
                        </div>
                    </div>
                </div>

            ))}

        </div>
    );
}

export default Index;
