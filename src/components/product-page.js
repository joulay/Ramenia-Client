import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, withRouter } from 'react-router-dom';
import moment from 'moment';
import queryString from 'query-string';
import {selectRamen} from '../actions/selections';
import {submitRamenReview} from '../actions/ramen';

import { API_BASE_URL } from '../config';

import fullStar from '../styles/images/stars/PNG/star-full.png';
import halfStar from '../styles/images/stars/PNG/star-half.png';
import emptyStar from '../styles/images/stars/PNG/star-empty.png';

class ProductPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ramenId: queryString.parse(this.props.location.search).ramenId,
            ramen: null,
            notFound: false,
            redirectCountDown: 10,
            writeReview: false,
            reviewText: '',
            ratingSelected: 0,
            spicyRatingSelected: 0
        }
    }

    componentWillUnmount() {
        this.props.dispatch(selectRamen(null))

    }

    componentDidMount() {
        try {
            this.props.dispatch(selectRamen(this.state.ramenId))
            return fetch(`${API_BASE_URL}/ramen/${this.state.ramenId}`, {
                method: 'GET'
            })
            .then(res => res.json())
            .then(result => {
                try {
                    let resp = result;
                    let totalRatings = [];
                    for (let j=0; j<result.ratings.length; j++) {
                        totalRatings.push(result.ratings[j].overall);
                    }
                    resp.overallRating = String(Math.round((totalRatings.reduce((a,b) => a+b) / totalRatings.length) * 10) / 10);
                    if (resp.overallRating.length === 1) {
                        resp.overallRating = String(resp.overallRating) + '.0';
                    }
                    this.setState({ramen: resp})
                    return resp;
                } catch (e) {
                    let resp = result
                    resp.overallRating = '0.0'
                    this.setState({ramen: resp})
                    return result;
                }
            })
            .catch(err => console.log(err))
        } catch(e) {
            return <Redirect to='/' />
        }
    }

    render() {
        try {
            let starArray;
            let count = 0;
            const reviews = this.state.ramen.ratings;
            const buildJSX = reviews.map((review) => {
                starArray = [];
                count = review.overall;
                while (starArray.length < 5) {
                    if (count >= 1) {
                        starArray.push({star: 'full', key: count});
                    } else if (count > 0) {
                        starArray.push({star: 'half', key: count});
                    } else {
                        starArray.push({star: 'empty', key: count});
                    }
                    count--
                }
                count = 0;
                const reviewStars = starArray.map((star) => {
                    count++;
                    if (star.star === 'full') {
                        return <img id={count} key={star.key} src={fullStar}/>
                    } else if (star.star === 'half') {
                        return <img id={count} key={star.key} src={halfStar}/>
                    } else {
                        return <img id={count} key={star.key} src={emptyStar}/>
                    }
                })
    
                let reviewText = '(This user did not leave a commented review)';
                if (review.review.length > 0) {
                    reviewText = review.review;
                }
                return (
                    <li key={review.id} className="product-page__reviews__li">
                        <span className="product-page__reviews__rating">{reviewStars}</span>
                        <p>Anonymous on {moment(review.created).format('MM/DD/YYYY')}</p>
                        <p>
                            {reviewText}
                        </p>
                    </li>
                )
            })
            queryString.parse(`ramenId=${this.props.selected}`)
            if (this.state.ramen.overallRating) {
            starArray = [];
            count = this.state.ramen.overallRating;
                while (starArray.length < 5) {
                    if (count >= 1) {
                        starArray.push({star: 'full', key: String(count)});
                    } else if (count > 0) {
                        starArray.push({star: 'half', key: String(count)});
                    } else {
                        starArray.push({star: 'empty', key: String(count)});
                    }
                    count--
                }
            }

            count = 0;
            const stars = starArray.map((star) => {
                count++;
                if (star.star === 'full') {
                    return <img id={count} key={star.key} src={fullStar}/>
                } else if (star.star === 'half') {
                    return <img id={count} key={star.key} src={halfStar}/>
                } else {
                    return <img id={count} key={star.key} src={emptyStar}/>
                }
            })
            const tags = this.state.ramen.tags.map((tag) => {
                return (
                    <li key={tag.id}>
                        #{tag.name}
                    </li>
                )
            })
            let reviewForm = 
            (
            <div className="product-page__main__right">
                <span className="product-page__main__right__top">            
                    <p className="product-page__main__number-rating">{this.state.ramen.overallRating}</p>
                    <span className="product-page__main__wrap">
                        <span className="product-page__main__total-rating">
                            {stars}
                        </span>
                        <p className="product-page__main__reviews">{this.state.ramen.ratings.length} Reviews</p>
                        <button onClick={() => this.setState({writeReview: true})} className="product-page__main__review-button" >Write a review!</button>
                    </span>
                </span>
                <span className="product-page__main__right__bottom">{tags}</span>
            </div>
            );
            if (this.state.writeReview) {
                starArray = [];
                count = this.state.ratingSelected;
                while (starArray.length < 5) {
                    if (count >= 1) {
                        starArray.push({star: 'full', key: count});
                    } else if (count > 0) {
                        starArray.push({star: 'half', key: count});
                    } else {
                        starArray.push({star: 'empty', key: count});
                    }
                    count--
                }
                count = 0;
                const reviewStars = starArray.map((star) => {
                    count++;
                    if (star.star === 'full') {
                        return <img onClick={(event) => this.setState({ratingSelected: parseInt(event.target.id)})} id={count} key={star.key} src={fullStar}/>
                    } else if (star.star === 'half') {
                        return <img onClick={(event) => this.setState({ratingSelected: parseInt(event.target.id)})} id={count} key={star.key} src={halfStar}/>
                    } else {
                        return <img onClick={(event) => this.setState({ratingSelected: parseInt(event.target.id)})} id={count} key={star.key} src={emptyStar}/>
                    }
                })

                let spicyArray = [];
                count = this.state.spicyRatingSelected;
                while (spicyArray.length < 5) {
                    if (count >= 1) {
                        spicyArray.push({star: 'full', key: count});
                    } else if (count > 0) {
                        spicyArray.push({star: 'half', key: count});
                    } else {
                        spicyArray.push({star: 'empty', key: count});
                    }
                    count--
                }
                count = 0;
                const reviewSpicy = spicyArray.map((star) => {
                    count++;
                    if (star.star === 'full') {
                        return <img onClick={(event) => this.setState({spicyRatingSelected: parseInt(event.target.id)})} id={count} key={star.key} src={fullStar}/>
                    } else if (star.star === 'half') {
                        return <img onClick={(event) => this.setState({spicyRatingSelected: parseInt(event.target.id)})} id={count} key={star.key} src={halfStar}/>
                    } else {
                        return <img onClick={(event) => this.setState({spicyRatingSelected: parseInt(event.target.id)})} id={count} key={star.key} src={emptyStar}/>
                    }
                })
                reviewForm = 
                (
                <div className="product-page__review container">
                    <form 
                    onSubmit={(event) => {
                        event.preventDefault();
                        const postBody = {
                            overall: this.state.ratingSelected,
                            spicyMeter: this.state.spicyRatingSelected,
                            review: this.state.reviewText
                        }
                        this.props.dispatch(submitRamenReview(this.state.ramen.id, postBody))
                        this.setState({writeReview: false})
                        window.location.reload();
                    }}
                    className="product-page__review__form">
                        <p className="product-page__review__rating">Rating: {reviewStars}</p>
                        <p className="product-page__review__rating">Spiciness: {reviewSpicy}</p>
                        <textarea onChange={(event) => this.setState({reviewText: event.target.value})} rows="4" cols="50" className="product-page__review__text"></textarea>
                        <a onClick={()=>this.setState({writeReview: false})} className="product-page__review__go-back">Go back to summary</a>
                        <button className="product-page__review__button">Submit</button>
                    </form>
                </div>
                );
            }

            return (
                <section className="product-page">
                    <h1 className="product-page__ramen-name">{this.state.ramen.name}</h1>
                    <div className="product-page__main container">
                        <div className="product-page__main__left">
                            <img className="product-page__main__favorite" src="http://icons.iconarchive.com/icons/alecive/flatwoken/256/Apps-Favorite-Heart-icon.png" />
                            <img className="product-page__main__image" src={this.state.ramen.image} />
                            {/* <span className="product-page__main__user-rating">{stars}</span> */}
                        </div>
                        {reviewForm}
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
    selected: state.selections.selected,
    ramen: state.ramen.data,
    companyData: state.ramen.companyData,
    tagData: state.ramen.tagData
});

export default withRouter(connect(mapStateToProps)(ProductPage));
