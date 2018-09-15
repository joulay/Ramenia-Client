import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter, Redirect } from 'react-router-dom';

import { normalizeResponseErrors } from '../actions/utils';
import { API_BASE_URL } from '../config';

import {selectRamen} from '../actions/selections';

import neoguri from '../styles/images/neoguri.jpeg';
// import { BrowserRouter as Router } from 'react-router-dom'; 

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ramen: [],
            style: 'Spicy'
        }
    }

    selectProduct(item) {
        this.props.dispatch(selectRamen(item))
    }

    componentDidMount() {

    }

    render() {
        console.log(this.props)
        const topRated = this.props.ramen.sort((a, b) => b.overallRating - a.overallRating).slice(0,5).map((item) => {
            let redirectString = '/product-page' + '?ramenId=' + item.id;
            return (
            <li key={item.name} 
            // onClick={() => this.selectProduct(item.id)} 
            className="home__featured__li">
                <a href={redirectString}><img src={item.image} className="home__featured__image"/></a>
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
    loggedIn: state.auth.currentUser !== null,
    selected: state.selections.selected,
    ramen: state.ramen.data
});

// Deal with update blocking - https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking
export default withRouter(connect(mapStateToProps)(Home));
