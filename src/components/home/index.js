import Axios from 'axios'
import './style.css'
import React, { useEffect, useState } from 'react'
import './style.css'
import { FaSkull, FaCheck, FaLocationArrow } from "react-icons/fa";
import { GiLifeBar } from "react-icons/gi";

function Index() {
    const [stateHighLighted, setStateHighLigth] = useState([])
    const [filteredTable, setFilteredTable] = useState([])
    const [tableQuery, setTableQuery] = useState('');
    const [res, setRes] = useState([])

    if (res.length === 0) {
        getStats()
    }

    //
    var highestDeathsByState = res.sort((a, b) => (a.deaths < b.deaths) ? 1 : -1).filter((e, i) => { if (i < 5) return e });

    useEffect(() => {
        async function fetchData() {
            const req = await Axios.get(`https://covid19-brazil-api.now.sh/api/report/v1/countries`)
            setStateHighLigth(req.data.data.sort((a, b) => (a.deaths < b.deaths) ? 1 : -1))
            console.log(req)
            return req
        }
        fetchData();
    }, [])
    useEffect(() => {
        async function fetchQuery() {
            if (tableQuery === '' || tableQuery === 'countries') {
                const req = await Axios.get(`https://covid19-brazil-api.now.sh/api/report/v1/${tableQuery}`)
                setFilteredTable(req.data.data.sort((a, b) => (a.deaths < b.deaths) ? 1 : -1))
                return req
            } else {
                const req = await Axios.get(`https://corona.lmao.ninja/v2/continents`)
                setFilteredTable(req.data)
                return req
            }

        }
        fetchQuery();
    }, [tableQuery])

    async function getStats() {
        const req = await Axios.get(`https://covid19-brazil-api.now.sh/api/report/v1/`)
        setRes(req.data.data);
    }

    function filterTableData(filteredCoutryState) {
        switch (tableQuery) {
            case '':
                return (
                    <td>{filteredCoutryState.state}</td>
                )
            case 'countries':
                return (
                    <td>{filteredCoutryState.country}</td>
                )
            case 'continents':
                return (
                    <td>{filteredCoutryState.continent}</td>
                )

            default:
                return (
                    <td>{filteredCoutryState.state}</td>
                )
        }
    }
    function filterTableHead() {
        switch (tableQuery) {
            case '':
                return (<th>
                    <FaLocationArrow className="location-icon"></FaLocationArrow>
                            Estados
                </th>)
            case 'countries':
                return (
                    <th>
                        <FaLocationArrow className="location-icon"></FaLocationArrow>
                                Países
                    </th>
                )
            case 'continents':
                return (
                    <th>
                        <FaLocationArrow className="location-icon"></FaLocationArrow>
                        Continentes
                    </th>
                )

            default:
                return (<th>
                    <FaLocationArrow className="location-icon"></FaLocationArrow>
                            Estados
                </th>)

        }

    }

    return (
        <div className="content">
            <section className="card-highlights">
                <div className="card-title">
                    <h1>Estatística em alguns países</h1>
                </div>
                <div className="card-wrapper">
                    {stateHighLighted.filter(e => e.country === 'Brazil' || e.country === 'Italy' || e.country === 'China' || e.country === 'Argentina').map(filteredCountry => (
                        <div className="country-card" key={filteredCountry.country}>
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
                </div>
                <div className="data-wrapper">
                    <div className="card-table-wrapper">
                        <div className="card-table-scroll">
                            <table className="content-table sticky">
                                <h1>Mais informações</h1>
                                <select className="select-filter" onChange={e => setTableQuery(e.target.value)}>
                                    <option value="">Estados</option>
                                    <option value="countries">Países</option>
                                    <option value="continents">Continentes</option>
                                </select>
                                <thead>
                                    <tr>
                                        {filterTableHead()}
                                        <th>
                                            <FaCheck className="confirmed-icon"></FaCheck>
                                            Confirmados
                                    </th>
                                        <th>
                                            <FaSkull className="deaths-icon"></FaSkull>
                                            Mortes
                                    </th>
                                    </tr>
                                </thead>
                                <tbody >
                                    {filteredTable.map(filteredCoutryState => (
                                        <tr key={filteredCoutryState.uf}>
                                            {filterTableData(filteredCoutryState)}
                                            <td>{filteredCoutryState.cases}</td>
                                            <td>{filteredCoutryState.deaths}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
            <section className="money-spent-stats">
                <div className="money-spent-wrapper">
                    <div className="money-spent-title">
                        <h1>Estados com maior número de mortos</h1>
                    </div>
                    <div className="highest-card">
                        {highestDeathsByState.map(e => (
                            <div className="highest-stats" key={e.uf}>
                                <div className="highest-stats-wrapper">
                                    <p className="state-name">
                                        {e.state}
                                    </p>
                                    <p className="state-amount">
                                        <FaSkull className="deaths-icon"></FaSkull>
                                        {e.deaths}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Index;
