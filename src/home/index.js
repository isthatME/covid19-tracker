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
        <div className="content">
            <div className="content-wrapper">
                <h1>Estatistica em alguns estados</h1>
                {state.filter(e => e.country === 'Brazil' || e.country === 'Italy' || e.country === 'China').map(filteredCountry => (
                    <div className="country-card">
                        <div className="country-stats">
                            <h1>Covid no {filteredCountry.country}</h1>
                            <div className="country-stats-wrapper">
                                <p>
                                    <FaCheck className="confirmed-icon"></FaCheck>
                                    {filteredCountry.confirmed}
                                </p>
                                <p>
                                    <GiLifeBar className="recovered-icon"></GiLifeBar>
                                    {filteredCountry.recovered}
                                </p>
                                <p>
                                    <FaSkull className="deaths-icon"></FaSkull>
                                    {filteredCountry.deaths}
                                </p>
                            </div>
                        </div>
                    </div>

                ))}
            </div>

        </div>
    );
}

export default Index;
