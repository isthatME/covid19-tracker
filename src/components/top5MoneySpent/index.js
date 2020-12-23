import React from 'react'
import './style.css'
import { FaSkull } from "react-icons/fa";

export const DeathsHisghLights = (props) => {
    const numberOfDeaths = props.numberOfDeaths


    return (
        <>
            <section className="money-spent-stats">
                <div className="money-spent-wrapper">
                    <div className="money-spent-title">
                        <h1>Estados com maior número de mortos</h1>
                    </div>
                    <div className="highest-card">
                        {numberOfDeaths.map(e => (
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
        </>
    )
}

export default DeathsHisghLights;