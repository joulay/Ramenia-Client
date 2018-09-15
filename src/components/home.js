import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter, Redirect } from 'react-router-dom';

import { normalizeResponseErrors } from '../actions/utils';
import { API_BASE_URL } from '../config';

import {selectRamen} from '../actions/selections';

import fullStar from '../styles/images/stars/PNG/star-full.png';
import halfStar from '../styles/images/stars/PNG/star-half.png';
import emptyStar from '../styles/images/stars/PNG/star-empty.png';
// import { BrowserRouter as Router } from 'react-router-dom'; 
//font-family: 'Kosugi Maru', sans-serif;

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ramen: [],
            style: 'Spicy',
            search: ''
        }
    }

    selectProduct(item) {
        this.props.dispatch(selectRamen(item))
    }

    componentDidMount() {

    }

    countStars(rating) {
        let count = 0;
        let resultArr = [];
        while (count < 5) {
            if (count+1 <= rating) {
                resultArr.push({star: 'full', key: count});
            } else if (count < rating) {
                resultArr.push({star: 'half', key: count});
            } else {
                resultArr.push({star: 'empty', key: count});
            }
            count++;
        }
        return resultArr;
    }

    render() {
        console.log(this.state)
        
        const topRated = this.props.ramen.filter((item) => item.overallRating > 0)
        .sort((a, b) => parseInt(b.overallRating) - parseInt(a.overallRating))
        .slice(0,5)
        .map((item) => {
            let redirectString = '/product-page' + '?ramenId=' + item.id;
            const rating = this.countStars(item.overallRating);
            const stars = rating.map((star) => {
                if (star.star === 'full') {
                    return <img key={star.key} src={fullStar}/>
                } else if (star.star === 'half') {
                    return <img key={star.key} src={halfStar}/>
                } else {
                    return <img key={star.key} src={emptyStar}/>
                }
            })
            return (
                <li key={item.name} 
                    id={item.overallRating}
                // onClick={() => this.selectProduct(item.id)} 
                className="home__featured__li">
                    <a href={redirectString}><img src={item.image} className="home__featured__image"/></a>
                    <span className="home__featured__details">
                        <p className="home__featured__name">{item.name}</p>
                        <p className="home__featured__rating">{stars}</p>
                    </span>
                </li>)
        })
        
        console.log(topRated);

        let display = (
            <div>
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

                    </ul>
                </div>
            </div>
        )
        if (this.state.search.length > 0) {
            const results = this.props.ramen.map((item) => {
                if (item.name.toLowerCase().includes(this.state.search)) {
                    let redirectString = '/product-page' + '?ramenId=' + item.id;
                    const rating = this.countStars(item.overallRating);
                    const stars = rating.map((star) => {
                        if (star.star === 'full') {
                            return <img key={star.key} src={fullStar}/>
                        } else if (star.star === 'half') {
                            return <img key={star.key} src={halfStar}/>
                        } else {
                            return <img key={star.key} src={emptyStar}/>
                        }
                    })
                    return (
                    <li key={item.name} 
                    // onClick={() => this.selectProduct(item.id)} 
                    className="home__search-results__li">
                        <a href={redirectString}><img src={item.image} className="home__search-results__image"/></a>
                        <span className="home__search-results__details">
                            <p className="home__search-results__name">{item.name}</p>
                            <p className="home__search-results__rating">{stars}</p>
                        </span>
                    </li>
                    )
                }
            })
            display = (
                <div className="home__search-results container">
                    <h2 className="home__search-results__header">Search Results <button onClick={() => this.setState({search: ''})} className="home__search-results__clear">Clear Results</button> </h2>
                    <ul className="home__search-results__ul">
                        {results}
                    </ul>
                </div>
            )
        }
        return (
            <section className="home">
                <div className="home__cover">
                    <h1 className="home__cover__header">Ramenia</h1>
                    <input value={this.state.search} onChange={(event) => this.setState({search: event.target.value})} placeholder="search" className="home__cover__search"></input>
                    <button className="home__cover__login">
                        <p className="home__cover__login__content">
                            Login/Signup
                        </p>
                    </button>
                </div>
                {display}
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
