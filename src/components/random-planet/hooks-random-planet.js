import React, {useEffect, useState} from 'react';

import Spinner from '../spinner';
import SwapiService from '../../services/swapi-service';
import './random-planet.css';
import PropTypes from 'prop-types'

const RandomPlanetHooks = props => {
    const [planet, setPlanet] = useState({});
    const [loading, setLoading] = useState(true);

    const swapiService = new SwapiService();

    useEffect(() => {
        const {updateInterval} = props;
        updatePlanet();
        const interval = setInterval(updatePlanet, updateInterval);
        return () => clearInterval(interval);
    }, [])


    const onPlanetLoaded = (planet) => {
        setPlanet(planet);
        setLoading(false);
    };

    const updatePlanet = () => {
        const id = Math.floor(Math.random() * 17) + 2;
        return swapiService
            .getPlanet(id)
            .then(onPlanetLoaded)
    };

    const hasData = !(loading);

    const spinner = loading ? <Spinner/> : null;
    const content = hasData ? <PlanetView planet={planet}/> : null;

    return (
        <div className="random-planet jumbotron rounded">
            {spinner}
            {content}
        </div>
    );

}

const PlanetView = ({planet}) => {

    const {
        id, name, population,
        rotationPeriod, diameter
    } = planet;

    return (
        <React.Fragment>
            <img className="planet-image"
                 src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
                 alt="planet"/>
            <div>
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <span className="term">Population</span>
                        <span>{population}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Rotation Period</span>
                        <span>{rotationPeriod}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Diameter</span>
                        <span>{diameter}</span>
                    </li>
                </ul>
            </div>
        </React.Fragment>
    );
};

RandomPlanetHooks.defaultProps = {
    updateInterval: 3000
}

RandomPlanetHooks.propTypes = {
    updateInterval: PropTypes.number
}

export default RandomPlanetHooks;


