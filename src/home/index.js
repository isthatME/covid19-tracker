import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../home/style.css'
import { FaSkull, FaCheck } from "react-icons/fa";
import { GiLifeBar } from "react-icons/gi";

function Index() {
    const [state, setState] = useState([])

    useEffect(() => {
        async function fetchData() {
            const req = await Axios.get('https://covid19-brazil-api.now.sh/api/report/v1/countries/')
            setState(req.data.data)
            return req
        }
        fetchData();
    }, [])

    return (
        <div className="content">
            <section className="card-highlights">
                <div className="card-title">
                    <h1>Estatistica em alguns países</h1>
                </div>
                <div className="card-wrapper">
                    {state.filter(e => e.country === 'Brazil' || e.country === 'Italy' || e.country === 'China' || e.country === 'Argentina').map(filteredCountry => (
                        <div className="country-card">
                            <div className="country-stats">
                                <h1>Covid Status: {filteredCountry.country}</h1>
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
            </section>
            <section className="table-filter">

            </section>

        </div>
    );
}

export default Index;
