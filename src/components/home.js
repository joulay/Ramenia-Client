import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';

import { normalizeResponseErrors } from '../actions/utils';
import { API_BASE_URL } from '../config';

import neoguri from '../styles/images/neoguri.jpeg';
// import { BrowserRouter as Router } from 'react-router-dom'; 
//font-family: 'Kosugi Maru', sans-serif;

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ramen: [],
            style: 'Spicy'
        }
    }

    componentDidMount() {
        return fetch(`${API_BASE_URL}/ramen`, {
            method: 'GET'
        })
        .then(res => res.json())
        .then(result => {
            let resp = result;
            for (let i=0; i<result.length; i++) {
                let totalRatings = [2]
                for (let j=0; j<result[i].ratings.length; j++) {
                    totalRatings.push(result[i].ratings[j].overall);
                }
                resp[i].overallRating = totalRatings.reduce((a,b) => a+b) / totalRatings.length;
            }
            this.setState({ramen: resp})
            return resp;
        })
        .catch(err => console.log(err))
    }

    render() {
        console.log(this.state);
        const topRated = this.state.ramen.map((item) => {
            return (
            <li key={item.name} className="home__featured__li">
                <img src={item.image} className="home__featured__image"/>
                <span>{item.overallRating}</span>
            </li>)
        })
        
        return (
            <section className="home">
                <div className="home__cover">
                    <h1 className="home__cover__header">Ramenia</h1>
                    <form className="home__cover__search">
                        <input placeholder="search" className="home__cover__search__input"></input>
                        <button className="home__cover__search__button">
                            Icon
                        </button>
                    </form>
                    <button className="home__cover__login">
                        <p className="home__cover__login__content">
                            Login/Signup
                        </p>
                    </button>
                </div>
                <div className="home__featured container">
                    <h2 className="home__featured__header">Top Rated Ramen</h2>
                    <ul className="home__featured__ul">
                        {topRated}
                    </ul>
                </div>
                <div className="home__by-type container">
                <h2 className="home__by-type__header">Top Ramen by Style</h2>
                    <ul className="home__by-type__types-list">
                        <li className="home__by-type__types-list__item home__by-type__spicy" onClick={() => this.setState({style: 'Spicy'})}>Spicy</li>
                        <li className="home__by-type__types-list__item home__by-type__korean" onClick={() => this.setState({style: 'Korean'})}>Korean</li>
                        <li className="home__by-type__types-list__item home__by-type__chinese" onClick={() => this.setState({style: 'Chinese'})}>Chinese</li>
                        <li className="home__by-type__types-list__item home__by-type__japanese" onClick={() => this.setState({style: 'Japanese'})}>Japanese</li>
                        <li className="home__by-type__types-list__item home__by-type__indonesian" onClick={() => this.setState({style: 'Indonesian'})}>Indonesian</li>
                        <li className="home__by-type__types-list__item home__by-type__soupless" onClick={() => this.setState({style: 'Soupless'})}>Soupless</li>
                    </ul>
                    <ul className="home__by-type__ul">
                        {topRated}
                    </ul>
                </div>
            </section>
    )
    }
}

const mapStateToProps = state => ({
    hasAuthToken: state.auth.authToken !== null,
    currentUser: state.auth.currentUser,
    loggedIn: state.auth.currentUser !== null
});

// Deal with update blocking - https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking
export default withRouter(connect(mapStateToProps)(Home));
