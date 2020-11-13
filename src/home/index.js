import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../home/style.css'
import { FaSkull, FaCheck } from "react-icons/fa";
import { GiLifeBar } from "react-icons/gi";

function Index() {
    const [stateHighLighted, setStateHighLigth] = useState([])
    const [filteredTable, setFilteredTable] = useState([])
    const [tableQuery, setTableQuery] = useState('');


    useEffect(() => {
        async function fetchData() {
            const req = await Axios.get(`https://covid19-brazil-api.now.sh/api/report/v1/countries`)
            setStateHighLigth(req.data.data)
            return req
        }
        fetchData();
    }, [])
    useEffect(() => {
        async function fetchQuery() {
            const req = await Axios.get(`https://covid19-brazil-api.now.sh/api/report/v1/${tableQuery}`)
            setFilteredTable(req.data.data)
            return req
        }
        fetchQuery();
    }, [tableQuery])


    return (
        <div className="content">
            <section className="card-highlights">
                <div className="card-title">
                    <h1>Estatistica em alguns países</h1>
                </div>
                <div className="card-wrapper">
                    {stateHighLighted.filter(e => e.country === 'Brazil' || e.country === 'Italy' || e.country === 'China' || e.country === 'Argentina').map(filteredCountry => (
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
            <section className="card-table">
                <div className="card-table-filter">
                    <h1>Mais informações</h1>
                    <select id="" onChange={e => setTableQuery(e.target.value)}>
                        <option value="">Estados</option>
                        <option value="countries">Países</option>
                    </select>
                </div>
                <div className="card-table-wrapper">
                    <table className="content-table">
                        <thead>
                            <tr>
                                {tableQuery === '' ? <th>Estados</th> : <th>Países</th>}
                                <th>Confirmados</th>
                                <th>Mortes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTable.map(filteredCoutryState => (
                                <tr>
                                    {tableQuery === '' ? <td>{filteredCoutryState.state}</td> : <td>{filteredCoutryState.country}</td>}
                                <td>{filteredCoutryState.cases}</td>
                                <td>{filteredCoutryState.deaths}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

        </div>
    );
}

export default Index;
