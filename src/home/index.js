import Axios from 'axios'
import '../home/style.css'
import React, { useEffect, useState } from 'react'
import '../home/style.css'
import { FaSkull, FaCheck, FaLocationArrow } from "react-icons/fa";
import { GiLifeBar, GiPadlock, GiMoneyStack, GiBed } from "react-icons/gi";

function Index() {
    const [stateHighLighted, setStateHighLigth] = useState([])
    const [filteredTable, setFilteredTable] = useState([])
    const [tableQuery, setTableQuery] = useState('');
    const [title, setTitle] = useState('')
    var teste;


    function handleUpdate() {
        teste = filteredTable.filter(e => e.uf === title.toUpperCase())
        console.log(teste)
        teste[0].state = "SERGIPE"
        console.log(teste)
    }

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
    }, [tableQuery, teste])


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
                    <h1>Mais informações</h1>
                    <select id="" onChange={e => setTableQuery(e.target.value)}>
                        <option value="">Estados</option>
                        <option value="countries">Países</option>
                    </select>
                </div>
                <div className="card-table-wrapper">
                    <div className="card-table-scroll">
                        <table className="content-table sticky">
                            <thead>
                                <tr>

                                    {tableQuery === '' ?
                                        <th>
                                            <FaLocationArrow className="location-icon"></FaLocationArrow>
                                                        Estados
                                        </th> :
                                        <th>
                                            <FaLocationArrow></FaLocationArrow>
                                                        Países
                                        </th>}

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
                                        {tableQuery === '' ? <td>{filteredCoutryState.state}</td> : <td>{filteredCoutryState.country}</td>}
                                        <td>{filteredCoutryState.cases}</td>
                                        <td>{filteredCoutryState.deaths}</td>
                                        <td>{Math.floor(Math.random() * (300 - 40) + 40)}</td>
                                        <td>R$: {Math.floor(Math.random() * (60000000 - 20000000) + 20000000)}</td>
                                        <td>{Math.floor(Math.random() * (300 - 40) + 40)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="top-five-cards">
                </div>
            </section>



            <input type="text" onChange={e => setTitle(e.target.value)} />
            <button onClick={handleUpdate}>update</button>
        </div>
    );
}

export default Index;
