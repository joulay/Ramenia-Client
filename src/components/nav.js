import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link, Route, withRouter } from 'react-router-dom';
import moment from 'moment';
import queryString from 'query-string';
import {selectRamen} from '../actions/selections';
import {submitRamenReview} from '../actions/ramen';

import { API_BASE_URL } from '../config';

import fullStar from '../styles/images/stars/PNG/star-full.png';
import halfStar from '../styles/images/stars/PNG/star-half.png';
import emptyStar from '../styles/images/stars/PNG/star-empty.png';

import ramenCollective from '../styles/images/ramen-collective.jpg'

class ProductPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }

    render() {


        return (
            <nav className="nav">
                <img className="nav__logo" src={ramenCollective}/>
                <ul className="nav__ul">
                    <li className="nav__li"> <Link className="nav__a" to="/"><i class="fas fa-home"></i> HOME</Link> </li>
                    <li className="nav__li"> <Link className="nav__a" to="/liked"><i class="far fa-heart"></i> LIKED</Link> </li>
                    {/* <li className="nav__li"> <Link className="nav__a" to="/forum">FORUM</Link> </li> */}
                    <li className="nav__li">  <Link className="nav__a" to="/login"><i class="fas fa-sign-in-alt"></i> LOG IN</Link> </li>
                    <li className="nav__li"> <Link className="nav__a" to="/signup"><i class="fas fa-user-plus"></i> SIGN UP</Link> </li>
                </ul>
            </nav>
        )
    }
}

const mapStateToProps = state => ({
    hasAuthToken: state.auth.authToken !== null,
    currentUser: state.auth.currentUser,
    loggedIn: state.auth.currentUser !== null,
    selected: state.selections.selected
});

export default withRouter(connect(mapStateToProps)(ProductPage));
