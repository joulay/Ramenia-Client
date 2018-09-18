import React from 'react';
import { connect } from 'react-redux';
import { Route, Link, withRouter, Redirect } from 'react-router-dom';

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
            search: '',
            ramenByCompany: 'NongShim',
            topRatedTab: 0,
            ramenByCompanyTab: 0,
            tags: []
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
        const topRated = this.props.ramen.filter((item) => item.overallRating > 0)
        .sort((a, b) => parseInt(b.overallRating) - parseInt(a.overallRating))
        .slice(0 + this.state.topRatedTab, 5 + this.state.topRatedTab)
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
            let itemName = item.name.slice(0, 22);
            if (itemName.length >= 22) {
                itemName += "...";
            }
            return (
                <li key={item.name} 
                    id={item.overallRating}
                // onClick={() => this.selectProduct(item.id)} 
                className="home__featured__li">
                    <Link to={redirectString}><img src={item.image} className="home__featured__image"/></Link>
                    <span className="home__featured__details">
                        <p className="home__featured__name">{itemName}</p>
                        <p className="home__featured__rating">{stars}</p>
                    </span>
                </li>)
        })

        let getSelectedCompanyInfo = this.props.companyData.filter((company) => company.name === this.state.ramenByCompany)[0];
        let companyRamenList;
        try {
            companyRamenList = getSelectedCompanyInfo.ramen
            .slice(0 + this.state.ramenByCompanyTab, 5 + this.state.ramenByCompanyTab)
            .map((item) => {
                let overallRating = 0;
                for (let i=0; i<item.ratings.length; i++) {
                    overallRating += parseInt(item.ratings[i].overall);
                }
                if (overallRating > 0) {
                    overallRating = overallRating / item.ratings.length;
                }
                let newItem = item;
                newItem.overallRating = overallRating; 
                return newItem;
            })
            .sort((a, b) => {
                return b.overallRating - a.overallRating;
              })
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
                let itemName = item.name.slice(0, 22);
                if (itemName.length >= 22) {
                    itemName += "...";
                }
                return (
                    <li 
                    className="home__by-company__li"
                    // onClick={() => this.selectProduct(item.id)} 
                    key={item.id}
                    className="home__by-company__li">
                        <Link to={redirectString}><img src={item.image} className="home__by-company__image"/></Link>
                        <span className="home__by-company__details">
                            <p className="home__by-company__name">{itemName}</p>
                            <p className="home__by-company__rating">{stars}</p>
                        </span>
                    </li>
                )
            })


        } catch (e) {}
        
        let display = (
            <div className="home">
                <div className="home__featured container">
                    <h2 className="home__featured__header">Top Rated Ramen</h2>
                    <ul className="home__featured__ul">
                        <button onClick={() => {
                            if (this.state.topRatedTab > 0) {
                                this.setState({topRatedTab: this.state.topRatedTab - 1})
                            }
                        }} className="item-list-button">&#8249;</button>
                        {topRated}
                        <button onClick={() => {
                            if (topRated.length === 5) {
                                this.setState({topRatedTab: this.state.topRatedTab + 1})
                            }
                        }} className="item-list-button">&#8250;</button>
                    </ul>
                </div>
                <div className="home__by-company container">
                <h2 className="home__by-company__header">Top Ramen by Company</h2>
                    <ul className="home__by-company__companys-list">
                        <li className="home__by-company__companys-list__item home__by-company__spicy" onClick={() => this.setState({ramenByCompany: 'NongShim'})}>NongShim</li>
                        <li className="home__by-company__companys-list__item home__by-company__korean" onClick={() => this.setState({ramenByCompany: 'Maruchan'})}>Maruchan</li>
                        <li className="home__by-company__companys-list__item home__by-company__chinese" onClick={() => this.setState({ramenByCompany: 'Sanyo Foods'})}>Sanyo Foods</li>
                        <li className="home__by-company__companys-list__item home__by-company__japanese" onClick={() => this.setState({ramenByCompany: 'Paldo'})}>Paldo</li>
                        <li className="home__by-company__companys-list__item home__by-company__indonesian" onClick={() => this.setState({ramenByCompany: 'Ottogi'})}>Ottogi</li>
                    </ul>
                    <ul className="home__by-company__ul">
                        <button onClick={() => {
                            if (this.state.ramenByCompanyTab > 0) {
                                this.setState({ramenByCompanyTab: this.state.ramenByCompanyTab - 1})
                            }
                        }} className="item-list-button">&#8249;</button>
                        {companyRamenList}
                        <button onClick={() => {
                            if (companyRamenList.length === 5) {
                                this.setState({ramenByCompanyTab: this.state.ramenByCompanyTab + 1})
                            }
                        }} className="item-list-button">&#8250;</button>
                    </ul>
                </div>
            </div>
        )
        if (this.state.search.length > 0) {
            const results = this.props.ramen
            .filter((item) => {
                if (!this.state.tags) {
                    return item;
                }
                if (item.tags.length > 0) {
                    let check = false;
                    let tagNames = item.tags.map((tag) => tag.name);
                    this.state.tags.forEach((tag) => {
                        if (tagNames.includes(tag.name)) {
                            check = true;
                        }
                    })
                    if (check === true) {
                        return item;
                    }
                }
            })
            .map((item) => {
                if (item.name.toLowerCase().includes(this.state.search) || item.companyId.name.toLowerCase().includes(this.state.search)) {
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
                    let itemName = item.name.slice(0, 22);
                    if (itemName.length >= 22) {
                        itemName += "...";
                    }
                    return (
                    <li key={item.name} 
                    // onClick={() => this.selectProduct(item.id)} 
                    className="home__search-results__li">
                        <Link to={redirectString}><img src={item.image} className="home__search-results__image"/></Link>
                        <span className="home__search-results__details">
                            <p className="home__search-results__name">{itemName}</p>
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

        let tagsSearchResults;
        let showTags;
        try {
            tagsSearchResults = this.props.tagData.map((tag) => {
                if (this.state.searchTags && tag.name.toLowerCase().includes(this.state.searchTags.toLowerCase())) {
                    return (
                        <li 
                        value={tag.id}
                        onClick={(event) => {
                            let tags = this.state.tags;
                            tags.push(tag);
                            this.setState({searchTags: '', tags})
                        }} className="home__search-tags-li" key={tag.id}>{tag.name}</li>
                    )
                }
            });
            showTags = this.state.tags.map((tag) => {
                return (
                    <li key={tag.id} value={tag.id} className="head__tags__li">
                        {tag.name} <a className="head__tags__li__remove" onClick={() => {
                            const tagRemoval = this.state.tags.filter((item) => item.name !== tag.name);
                            this.setState({tags: tagRemoval})
                        }}>X</a>
                    </li>
                )
            })
        } catch (e) {}

        return (
            <section className="home">
                <div className="home__head">
                    <span className="home__search-span">
                        <input value={this.state.search} onChange={(event) => this.setState({search: event.target.value})} placeholder="search" className="home__search-input"></input>
                        <ul className="home__search-tags-ul">
                            <input onChange={(event) => this.setState({searchTags: event.target.value})} placeholder="tags" className="home__search-tags-input"/>
                            {tagsSearchResults}
                        </ul>
                        {showTags}
                        {/* <input className="home__search-input__checkbox home__search-input__checkbox__tags" id="tags" type="checkbox" />
                        <label className="home__search-input__label home__search-input__label__tags" for="tags">Tags</label>
                        <input className="home__search-input__checkbox home__search-input__checkbox__name" id="name" type="checkbox" />
                        <label className="home__search-input__label home__search-input__label__name" for="name">Name</label>
                        <input className="home__search-input__checkbox home__search-input__checkbox__company" id="company" type="checkbox" />
                        <label className="home__search-input__label home__search-input__label__company" for="company">Company</label> */}
                    </span>
                    <img className="home__advertisement" src="http://jhs.gcs.k12.in.us/wp-content/uploads/sites/42/2015/08/768-x-90general.jpg"/>
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
    ramen: state.ramen.data,
    companyData: state.ramen.companyData,
    tagData: state.ramen.tagData
});

// Deal with update blocking - https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking
export default withRouter(connect(mapStateToProps)(Home));
