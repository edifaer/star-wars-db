import React, {Component} from 'react';
import Header from '../header';
import RandomPlanet from '../random-planet';
import SwapiService from "../../services/swapi-service";
import {SwapiServiceProvider} from '../swapi-service-context'
import './app.css';
import ErrorBoundry from "../error-boundry/error-boundry";
import DummySwapiService from "../../services/dummy-swapi-service";
import {PeoplePage, PlanetsPage, StarshipsPage} from "../pages";
import RandomPlanetHooks from "../random-planet/hooks-random-planet";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import StarshipDetails from "../sw-components/starship-details";
import LoginPage from "../pages/login-page";
import SecretPage from "../pages/secret-page";
import notFoundPage from "../pages/notFoundPage";

export default class App extends Component {
    state = {
        swapiService: new SwapiService(),
        showRandomPlanet: true,
        isLoggedIn: false
    };

    onLogin = () => {
        this.setState({
            isLoggedIn: true
        })
    };

    onServiceChange = () => {
        this.setState(({swapiService}) => {
            const Service = swapiService instanceof SwapiService ?
                DummySwapiService : SwapiService;

            return {
                swapiService: new Service()
            };
        })
    }

    render() {
        const {isLoggedIn} = this.state;
        const planet = this.state.showRandomPlanet ?
            <RandomPlanetHooks/> :
            null;

        return (
            <ErrorBoundry>
                <SwapiServiceProvider value={this.state.swapiService}>
                    <BrowserRouter>
                        <div className="stardb-app">
                            <Header onServiceChange={this.onServiceChange}/>
                            {planet}
                            <Switch>
                                <Route exact path='/' render={() => <h2>Welcome to StarDB</h2>}/>
                                <Route path='/people/:id?' component={PeoplePage}/>
                                <Route path='/planets' component={PlanetsPage}/>
                                <Route exact path='/starships' component={StarshipsPage}/>
                                <Route path='/starships/:id'
                                       render={({match}) => {
                                           return <StarshipDetails itemId={match.params.id}/>
                                       }}/>
                                <Route path='/login' render={() => (
                                    <LoginPage isLoggedIn={isLoggedIn}
                                               onLogin={this.onLogin}/>)}
                                />
                                <Route path='/secret' render={() => (
                                    <SecretPage
                                        isLoggedIn={isLoggedIn}/>)}
                                />
                                <Route component={notFoundPage}/>
                            </Switch>
                        </div>
                    </BrowserRouter>
                </SwapiServiceProvider>
            </ErrorBoundry>
        );
    }
}
