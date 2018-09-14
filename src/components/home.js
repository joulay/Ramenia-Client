import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';

import neoguri from '../styles/images/neoguri.jpeg';
// import { BrowserRouter as Router } from 'react-router-dom'; 
//font-family: 'Kosugi Maru', sans-serif;

class Home extends React.Component {

    render() {
        let placeholder = ['Yukkaejong', 'ShinRamen', 'Buldakbokkeummyeon', 'Neoguri', 'Japaghetti'];
        const buildJSX = placeholder.map((item) => {
            return (
            <li className="home__featured__li">
                <img src={neoguri} className="home__featured__image"/>
                <p className="home__featured__item-name">{item}</p>
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
                        {buildJSX}
                    </ul>
                </div>
                <div className="home__by-type container">
                <h2 className="home__by-type__header">Top Ramen by Style</h2>
                    <ul className="home__by-type__types-list">
                        <li className="home__by-type__types-list__item home__by-type__spicy"><a>Spicy</a></li>
                        <li className="home__by-type__types-list__item home__by-type__korean"><a>Korean</a></li>
                        <li className="home__by-type__types-list__item home__by-type__chinese"><a>Chinese</a></li>
                        <li className="home__by-type__types-list__item home__by-type__japanese"><a>Japanese</a></li>
                        <li className="home__by-type__types-list__item home__by-type__indonesian"><a>Indonesian</a></li>
                        <li className="home__by-type__types-list__item home__by-type__soupless"><a>Soupless</a></li>
                    </ul>
                    <ul className="home__by-type__ul">
                        {buildJSX}
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
