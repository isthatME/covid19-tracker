import Axios from 'axios'
import './style.css'
import React, { useEffect, useState } from 'react'
import './style.css'
import { FaSkull, FaCheck, FaLocationArrow } from "react-icons/fa";
import { GiLifeBar, GiPadlock, GiMoneyStack, GiBed } from "react-icons/gi";

function Index() {
    const [stateHighLighted, setStateHighLigth] = useState([])
    const [filteredTable, setFilteredTable] = useState([])
    const [tableQuery, setTableQuery] = useState('');
    const [res, setRes] = useState([])

    if (res.length === 0) {
        getStats()
    }
    var highestDeathsByState = res.filter((e, i) => { if (i < 5) return e });
    var highestMoneySpent = filteredTable.sort((a, b) => (a.moneySpent < b.moneySpent) ? 1 : -1).filter((e, i) => { if (i < 5) return e });
    var lowestMoneySpent = filteredTable.sort((a, b) => (a.moneySpent > b.moneySpent) ? 1 : -1).filter((e, i) => { if (i < 5) return e });

    useEffect(() => {
        async function fetchData() {
            const req = await Axios.get(`https://covid19-brazil-api.now.sh/api/report/v1/countries`)
            req.data.data.map(e => {
                e.moneySpent = Math.floor(Math.random() * (10 - 20000000) + 20000000)
                e.daysLocked = Math.floor(Math.random() * (300 - 40) + 40)
                e.occupiedBeds = Math.floor(Math.random() * (300 - 40) + 40)
            })
            setStateHighLigth(req.data.data)
            return req
        }
        fetchData();
    }, [])
    useEffect(() => {
        async function fetchQuery() {
            if (tableQuery === '' || tableQuery === 'countries') {
                const req = await Axios.get(`https://covid19-brazil-api.now.sh/api/report/v1/${tableQuery}`)
                req.data.data.map(e => {
                    e.moneySpent = Math.floor(Math.random() * (60000000 - 20000000) + 20000000)
                    e.daysLocked = Math.floor(Math.random() * (300 - 40) + 40)
                    e.occupiedBeds = Math.floor(Math.random() * (300 - 40) + 40)
                })
                setFilteredTable(req.data.data)
                return req
            } else {
                const req = await Axios.get(`https://corona.lmao.ninja/v2/continents`)
                req.data.map(e => {
                    e.moneySpent = Math.floor(Math.random() * (60000000 - 20000000) + 20000000)
                    e.daysLocked = Math.floor(Math.random() * (300 - 40) + 40)
                    e.occupiedBeds = Math.floor(Math.random() * (1000 - 50) + 50)
                })
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
                    <h1>Estatistica em alguns países</h1>
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
                                        <th>
                                            <GiPadlock className="lockdown-icon"></GiPadlock>
                                            Dias em lockDown
                                    </th>
                                        <th>
                                            <GiMoneyStack className="money-icon"></GiMoneyStack>
                                            Total gasto
                                    </th>
                                        <th>
                                            <GiBed className="leitos-icon"></GiBed>
                                            Leitos ocupados
                                    </th>
                                    </tr>
                                </thead>
                                <tbody >
                                    {filteredTable.map(filteredCoutryState => (
                                        <tr key={filteredCoutryState.uf}>
                                            {filterTableData(filteredCoutryState)}
                                            <td>{filteredCoutryState.cases}</td>
                                            <td>{filteredCoutryState.deaths}</td>
                                            <td>{filteredCoutryState.daysLocked}</td>
                                            <td>R$: {filteredCoutryState.moneySpent}</td>
                                            <td>{filteredCoutryState.occupiedBeds}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="top-five-cards">
                        <div className="highest-title">
                            <h1>Estados com mais mortos</h1>
                        </div>
                        <div className="highest-card">
                            {highestDeathsByState.map(e => (
                                <div className="highest-stats" key={e.uf}>
                                    <div className="highest-stats-wrapper">
                                        <p className="state-name">
                                            {e.state}
                                        </p>
                                        <p className="state-amount">
                                            {e.deaths}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            <section className="highest-money-spent-stats">
                <div className="money-spent-wrapper">
                    <div className="money-spent-title">
                        <h1>Estados que mais gastaram durante a pandemia</h1>
                    </div>
                    <div className="highest-card">
                        {highestMoneySpent.map(e => (
                            <div className="highest-stats" key={e.uf}>
                                <div className="highest-stats-wrapper">
                                    <p className="state-name">
                                        {e.state}
                                    </p>
                                    <p className="state-amount">
                                        <GiMoneyStack className="money-icon"></GiMoneyStack>
                                        {e.moneySpent}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section className="money-spent-stats">
                <div className="money-spent-wrapper">
                    <div className="money-spent-title">
                        <h1>Estados que menos gastaram durante a pandemia</h1>
                    </div>
                    <div className="highest-card">
                        {lowestMoneySpent.map(e => (
                            <div className="highest-stats" key={e.uf}>
                                <div className="highest-stats-wrapper">
                                    <p className="state-name">
                                        {e.state}
                                    </p>
                                    <p className="state-amount">
                                        <GiMoneyStack className="money-icon"></GiMoneyStack>
                                        {e.moneySpent}
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
