import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, withRouter } from 'react-router-dom';
import moment from 'moment';
import queryString from 'query-string';
import {selectRamen} from '../actions/selections';

import { API_BASE_URL } from '../config';

class ProductPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ramen: null,
            notFound: false,
            redirectCountDown: 10
        }
    }

    componentDidMount() {

        // const params = new URLSearchParams(this.props.location.search);
        // params.get('ramenId')
        if (!this.props.selected) {
            const values = queryString.parse(this.props.location.search);
            console.log(values)

            try {
                this.props.dispatch(selectRamen(values.ramenId))
                setTimeout(() => {
                    return fetch(`${API_BASE_URL}/ramen/${this.props.selected}`, {
                        method: 'GET'
                    })
                    .then(res => res.json())
                    .then(result => {
                        let resp = result;
                        for (let i=0; i<result.length; i++) {
                            let totalRatings = []
                            for (let j=0; j<result[i].ratings.length; j++) {
                                totalRatings.push(result[i].ratings[j].overall);
                            }
                            resp[i].overallRating = totalRatings.reduce((a,b) => a+b) / totalRatings.length;
                        }
                        this.setState({ramen: resp})
                        return resp;
                    })
                    .catch(err => console.log(err))
                }, 1000)
            } catch(e) {
                return <Redirect to='/' />
            }
        } else {
            return fetch(`${API_BASE_URL}/ramen/${this.props.selected}`, {
                method: 'GET'
            })
            .then(res => res.json())
            .then(result => {
                let resp = result;
                for (let i=0; i<result.length; i++) {
                    let totalRatings = []
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

        
    }

    render() {
        console.log(this.state);
        console.log(this.props);
        try {
            // if (this.state.notFound) {
            //     return (<div className="loading">Unable to find product page, redirecting in {this.state.redirectCountDown}...</div>)
            // }

            const reviews = this.state.ramen.ratings;
            const buildJSX = reviews.map((review) => {
                return (
                    <li key={review.id} className="product-page__reviews__li">
                        <span className="product-page__reviews__rating">XXXXX</span>
                        <p>Anonymous on {moment(review.created).format('MM/DD/YYYY')}</p>
                        <p>
                            {review.review}
                        </p>
                    </li>
                )
            })
            queryString.parse(`ramenId=${this.props.selected}`)
    
            return (
                <section className="product-page">
                    <div className="product-page__main container">
                        <div className="product-page__main__left">
                            <img className="product-page__main__favorite" src="http://icons.iconarchive.com/icons/alecive/flatwoken/256/Apps-Favorite-Heart-icon.png" />
                            <img className="product-page__main__image" src={this.state.ramen.image} />
                            <span className="product-page__main__user-rating">XXXXX</span>
                        </div>
                        <div className="product-page__main__right">
                            <p className="product-page__main__number-rating">4.7</p>
                            <span className="product-page__main__wrap">
                                <span className="product-page__main__total-rating">XXXXX</span>
                                <p>302 Reviews</p>
                            </span>
                        </div>
                    </div>
                    <div className="product-page__reviews container">
                        <ul className="product-page__reviews__ul">
                            {buildJSX}
                        </ul>
                    </div>
                </section>
            
        )
        }
        catch (e) {
            if (this.state.redirectCountDown <= 0) {
                return <Redirect to='/' />
            }
            setTimeout(()=>{if (!this.props.selected){ this.setState({redirectCountDown: 0}) }},3000)
            return (<div className="loading">Loading...</div>)
        }
    }
}

const mapStateToProps = state => ({
    hasAuthToken: state.auth.authToken !== null,
    currentUser: state.auth.currentUser,
    loggedIn: state.auth.currentUser !== null,
    selected: state.selections.selected
});

export default withRouter(connect(mapStateToProps)(ProductPage));
