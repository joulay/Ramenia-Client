import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter, Redirect } from 'react-router-dom';

import { normalizeResponseErrors } from '../actions/utils';
import { API_BASE_URL } from '../config';

import {selectRamen} from '../actions/selections';

import neoguri from '../styles/images/neoguri.jpeg';
// import { BrowserRouter as Router } from 'react-router-dom'; 

class Admin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tab: 'add',
            companies: [],
            confirm: false,
            ramenName: '',
            ramenCompanyId: '',
            ramenImageUrl: ''
        }
    }

    componentDidMount() {
        return fetch(`${API_BASE_URL}/company`, {
            method: 'GET'
        })
        .then(res => res.json())
        .then(result => {
            this.setState({companies:result})
        })
        .catch(err => console.log(err))
    }

    render() {
        console.log(this.state);
        console.log(this.props);

        const companyList = this.state.companies.map((company) => {
            return (
                <li key={company.id} className="admin__company-list__item">
                    <p>{company.name} : {company.id}</p>
                </li>
            ) 
        })

        let menu = (
            <div>
                <h1>This area is only for authorized members.</h1>
            </div>
        );

        if (this.state.tab === 'createRamen') {
            menu = (
                <div className="admin">
                    <ul className="admin__company-list">
                        <h2>Company ID Information</h2>
                        {companyList}
                    </ul>
                    <h2>Create Ramen</h2>
                    <form onSubmit={(event) => {
                        event.preventDefault()
                        this.setState({confirm: 'confirmRamen'})
                    }} className="admin__form">
                        <label className="admin__label">Name</label>
                        <input onChange={(event) => this.setState({ramenName: event.target.value})} className="admin__input" />
                        <label className="admin__label">Company ID</label>
                        <input onChange={(event) => this.setState({ramenCompanyId: event.target.value})} className="admin__input" />
                        <label className="admin__label">Product Image URL</label>
                        <input onChange={(event) => this.setState({ramenImageUrl: event.target.value})} className="admin__input" />
                        <button className="admin__button">Check</button>
                    </form>
                </div>
            )
        } else if (this.state.tab === 'createCompany') {
            menu = (
                <div className="admin">
                    <h2>Add Company</h2>
                </div>
            )
        } else if (this.state.tab === 'createTag') {
            menu = (
                <div className="admin">
                    <h2>Create Tag</h2>
                </div>
            )
        } else if (this.state.tab === 'addTagToRamen') {
            menu = (
                <div className="admin">
                    <h2>Add Tag to Ramen</h2>

                </div>
            )
        }
        
        if (this.state.confirm === 'confirmRamen') {
            this.props.ramen.forEach((item) => {
                if (item.name === this.state.ramenName) {
                    alert('A ramen with this exact name already exists!')
                    this.setState({confirm: false})
                }
            })
            let companyName;
            let companyCheck = false;
            this.state.companies.forEach((company) => {
                if (company.id === this.state.ramenCompanyId) {
                    companyName = company.name
                    companyCheck = true;
                }
            })
            if (companyCheck === false) {
                alert('Unable to find Company with the provided ID!')
                this.setState({confirm: false})
            }
            return (
                <section className="admin container">
                    <nav className="admin__nav">
                        <ul className="admin__nav__ul">
                            <li onClick={() => this.setState({tab: 'createRamen', confirm: false})} className="admin__nav__ul__li">Create Ramen</li>
                            <li onClick={() => this.setState({tab: 'createCompany', confirm: false})} className="admin__nav__ul__li">Create Company</li>
                            <li onClick={() => this.setState({tab: 'createTag', confirm: false})} className="admin__nav__ul__li">Create Tag</li>
                            <li onClick={() => this.setState({tab: 'addTagToRamen', confirm: false})} className="admin__nav__ul__li">Add Tag to Ramen</li>
                        </ul>
                    </nav>
                    <form onSubmit={(event) => {
                        event.preventDefault();
                        const postBody = {
                            name: this.state.ramenName,
                            companyId: this.state.ramenCompanyId,
                            image: this.state.ramenImageUrl
                        }
                        return fetch(`${API_BASE_URL}/ramen`, {
                            method: 'POST',
                            body: JSON.stringify(postBody),
                            headers: {
                                // Authorization: `Bearer ${authToken}`,
                                'Content-Type': 'application/json'
                            }
                        })
                        .then(res => res.json())
                        .then(result => {
                            console.log(result);
                            this.setState({confirm: false})
                        })
                        .catch(err => console.log(err))
                    }}>
                        <h2>Please check to make sure the following is correct:</h2>
                        <ul className="admin__confirm">
                            <li className="admin__confirm__name">Name of Product: {this.state.ramenName}</li>
                            <li className="admin__confirm__company">Company: {companyName}</li>
                            <li className="admin__confirm__image"><img src={this.state.ramenImageUrl}/></li>
                        </ul>
                        <h3>If the image fails to load DO NOT SUBMIT!</h3>
                        <button>Confirm Submission</button>
                    </form>
                </section>
            )
        } else {
            return (
                <section className="admin container">
                    <nav className="admin__nav">
                        <ul className="admin__nav__ul">
                            <li onClick={() => this.setState({tab: 'createRamen'})} className="admin__nav__ul__li">Create Ramen</li>
                            <li onClick={() => this.setState({tab: 'createCompany'})} className="admin__nav__ul__li">Create Company</li>
                            <li onClick={() => this.setState({tab: 'createTag'})} className="admin__nav__ul__li">Create Tag</li>
                            <li onClick={() => this.setState({tab: 'addTagToRamen'})} className="admin__nav__ul__li">Add Tag to Ramen</li>
                        </ul>
                    </nav>
                    {menu}
                </section>
            )  
        }


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
export default withRouter(connect(mapStateToProps)(Admin));
