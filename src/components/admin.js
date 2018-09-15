import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter, Redirect } from 'react-router-dom';

import { normalizeResponseErrors } from '../actions/utils';
import { API_BASE_URL } from '../config';

import {selectRamen} from '../actions/selections';

class Admin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tab: 'add',
            companies: [],
            confirm: false
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

        const navBar = (
            <nav className="admin__nav">
                <ul className="admin__nav__ul">
                    <li onClick={() => this.setState({tab: 'createRamen', confirm: false})} className="admin__nav__ul__li">Create Ramen</li>
                    <li onClick={() => this.setState({tab: 'createCompany', confirm: false})} className="admin__nav__ul__li">Create Company</li>
                    <li onClick={() => this.setState({tab: 'createTag', confirm: false})} className="admin__nav__ul__li">Create Tag</li>
                    <li onClick={() => this.setState({tab: 'addTagToRamen', confirm: false})} className="admin__nav__ul__li">Add Tag to Ramen</li>
                    <li onClick={() => this.setState({tab: 'deleteTagFromRamen'})} className="admin__nav__ul__li">Remove Tag from Ramen</li>
                    <li onClick={() => this.setState({tab: 'delete'})} className="admin__nav__ul__li">Delete Ramen/Company/Tag</li>
                </ul>
            </nav>
            )

        const companyList = this.state.companies.map((company) => {
            return (
                <li key={company.id} className="admin__company-list__item">
                    <p>{company.name} : {company.id}</p>
                </li>
            ) 
        })
        const ramenList = this.props.ramen.map((ramen) => {
            return (
                <li key={ramen.id} className="admin__ramen-list__item">
                    <p>{ramen.name} : {ramen.id}</p>
                </li>
            )
        })
        const tagList = this.props.tags.map((tag) => {
            return (
                <li key={tag.id} className="admin__tag-list__item">
                    <p>{tag.name} : {tag.id}</p>
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
                        <input required onChange={(event) => this.setState({ramenName: event.target.value})} className="admin__input" />
                        <label className="admin__label">Company ID</label>
                        <input required onChange={(event) => this.setState({ramenCompanyId: event.target.value})} className="admin__input" />
                        <label className="admin__label">Product Image URL</label>
                        <input required onChange={(event) => this.setState({ramenImageUrl: event.target.value})} className="admin__input" />
                        <button className="admin__button">Check</button>
                    </form>
                </div>
            )
        } else if (this.state.tab === 'createCompany') {
            menu = (
                <div className="admin">
                    <ul className="admin__company-list">
                        <h2>Company ID Information</h2>
                        {companyList}
                    </ul>
                    <h2>Create Company</h2>
                    <form onSubmit={(event) => {
                        event.preventDefault()
                        this.setState({confirm: 'confirmCompany'})
                    }} className="admin__form">
                        <label className="admin__label">Company Name</label>
                        <input required onChange={(event) => this.setState({companyName: event.target.value})} className="admin__input" />
                        <label className="admin__label">Company Home Page URL</label>
                        <input required onChange={(event) => this.setState({companyUrl: event.target.value})} className="admin__input" />
                        <button className="admin__button">Check</button>
                    </form>
                </div>
            )
        } else if (this.state.tab === 'createTag') {
            menu = (
                <div className="admin">
                    <ul className="admin__tag-list">
                        <h2>List of existing Tags</h2>
                        {tagList}
                    </ul>
                    <h2>Create Tag</h2>
                    <form onSubmit={(event) => {
                        event.preventDefault()
                        this.setState({confirm: 'confirmTag'})
                    }} className="admin__form">
                        <label className="admin__label">Tag Name</label>
                        <input required onChange={(event) => this.setState({tagName: event.target.value})} className="admin__input" />
                        <button className="admin__button">Check</button>
                    </form>
                </div>
            )
        } else if (this.state.tab === 'addTagToRamen') {
            menu = (
                <div className="admin">
                    <h2>Add Tag to Ramen</h2>
                    <form onSubmit={(event) => {
                        event.preventDefault()
                        this.setState({confirm: 'confirmRamenTag'})
                    }} className="admin__form">
                        <label className="admin__label">Ramen ID</label>
                        <input required onChange={(event) => this.setState({ramenId: event.target.value})} className="admin__input" />
                        <label className="admin__label">Tag ID</label>
                        <input required onChange={(event) => this.setState({tagId: event.target.value})} className="admin__input" />
                        <button className="admin__button">Check</button>
                    </form>
                    <ul className="admin__ramen-tags-list">
                        <h2>List of existing Ramen</h2>
                        {ramenList}
                    </ul>
                    <ul className="admin__ramen-tags-list">
                        <h2>List of existing Tags</h2>
                        {tagList}
                    </ul>
                </div>
            )
        } else if (this.state.tab === 'deleteTagFromRamen') {
            menu = (
                <div className="admin">
                    <h2>Delete Tag From Ramen</h2>
                    <form onSubmit={(event) => {
                        event.preventDefault()
                        this.setState({confirm: 'confirmTagRemoval'})
                    }} className="admin__form">
                        <label className="admin__label">Ramen ID</label>
                        <input required onChange={(event) => this.setState({ramenId: event.target.value})} className="admin__input" />
                        <label className="admin__label">Tag ID</label>
                        <input required onChange={(event) => this.setState({tagId: event.target.value})} className="admin__input" />
                        <button className="admin__button">Check</button>
                    </form>
                    <ul className="admin__ramen-tags-list">
                        <h2>List of existing Ramen</h2>
                        {ramenList}
                    </ul>
                    <ul className="admin__ramen-tags-list">
                        <h2>List of existing Tags</h2>
                        {tagList}
                    </ul>
                </div>
            )
        }
        
        if (this.state.confirm === 'confirmRamen') {
            this.props.ramen.forEach((item) => {
                if (item.name.toLowerCase() === this.state.ramenName.toLowerCase()) {
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
                    {navBar}
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
                            this.setState({confirm: false})
                            window.location.reload();
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
        } else if (this.state.confirm === 'confirmCompany') {
            let companyName;
            let companyCheck = false;
            this.state.companies.forEach((company) => {
                if (company.name.toLowerCase() === this.state.companyName.toLowerCase()) {
                    alert('A company with this name already exists in the database!')
                    this.setState({confirm: false})
                }
            })
            return (
                <section className="admin container">
                {navBar}
                <form onSubmit={(event) => {
                    event.preventDefault();
                    const postBody = {
                        name: this.state.companyName,
                        companyUrl: this.state.companyUrl,
                    }
                    return fetch(`${API_BASE_URL}/company`, {
                        method: 'POST',
                        body: JSON.stringify(postBody),
                        headers: {
                            // Authorization: `Bearer ${authToken}`,
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(res => {res.json()})
                    .then(result => {
                        this.setState({confirm: false})
                        window.location.reload();
                    })
                    .catch(err => console.log(err))
                }}>
                    <h2>Please check to make sure the following is correct:</h2>
                    <ul className="admin__confirm">
                        <li className="admin__confirm__name">Name of Company: {this.state.companyName}</li>
                        <li className="admin__confirm__company">Company Home Page: {this.state.companyUrl}</li>
                    </ul>
                    <button>Confirm Submission</button>
                </form>
            </section>
            )
        } else if (this.state.confirm === 'confirmTag') {
            let tagName;
            let tagCheck = false;
            this.props.tags.forEach((tag) => {
                if (tag.name.toLowerCase() === this.state.tagName.toLowerCase()) {
                    alert('A tag with this name already exists in the database!')
                    this.setState({confirm: false})
                }
            })
            return (
                <section className="admin container">
                {navBar}
                <form onSubmit={(event) => {
                    event.preventDefault();
                    const postBody = {
                        name: this.state.tagName
                    }
                    return fetch(`${API_BASE_URL}/tags`, {
                        method: 'POST',
                        body: JSON.stringify(postBody),
                        headers: {
                            // Authorization: `Bearer ${authToken}`,
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(res => {res.json()})
                    .then(result => {
                        this.setState({confirm: false})
                        window.location.reload();
                    })
                    .catch(err => console.log(err))
                }}>
                    <h2>Please check to make sure the following is correct:</h2>
                    <ul className="admin__confirm">
                        <li className="admin__confirm__name">Name of Tag: {this.state.tagName}</li>
                    </ul>
                    <button>Confirm Submission</button>
                </form>
            </section>
            )
        } else if (this.state.confirm === 'confirmRamenTag') {
            this.props.ramen.forEach((ramen) => {
                ramen.tags.forEach((tag) => {
                    if (tag.id === this.state.tagID) {
                        alert('A tag with this ID is already attached to this ramen!')
                        this.setState({confirm: false})
                    }
                })
            })
            const findTagName = this.props.tags.filter((tag) => tag.id === this.state.tagId).map((tag) => (<p key={tag.id}>{tag.name}</p>));
            const findRamenName = this.props.ramen.filter((ramen) => ramen.id === this.state.ramenId).map((ramen) => (<p key={ramen.id}>{ramen.name}</p>));

            return (
                <section className="admin container">
                {navBar}
                <form onSubmit={(event) => {
                    event.preventDefault();
                    const postBody = {
                        tagId: this.state.tagId,
                        ramenId: this.state.ramenId
                    }
                    return fetch(`${API_BASE_URL}/tags-ramen`, {
                        method: 'PUT',
                        body: JSON.stringify(postBody),
                        headers: {
                            // Authorization: `Bearer ${authToken}`,
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(res => res.json())
                    .then(result => {
                        this.setState({confirm: false})
                    })
                    .catch(err => console.log(err))
                }}>
                    <h2>Please check to make sure the following is correct:</h2>
                    <ul className="admin__confirm">
                        <li className="admin__confirm__name">Name of Ramen: {findRamenName}</li>
                        <li className="admin__confirm__name">Name of Tag: {findTagName}</li>
                    </ul>
                    <button>Confirm Submission</button>
                </form>
            </section>
            )
        } else if (this.state.confirm === 'confirmTagRemoval') {
            const findTagName = this.props.tags.filter((tag) => tag.id === this.state.tagId).map((tag) => (<p key={tag.id}>{tag.name}</p>));
            const findRamenName = this.props.ramen.filter((ramen) => ramen.id === this.state.ramenId).map((ramen) => (<p key={ramen.id}>{ramen.name}</p>));

            return (
                <section className="admin container">
                {navBar}
                <form onSubmit={(event) => {
                    event.preventDefault();
                    const postBody = {
                        tagId: this.state.tagId,
                        ramenId: this.state.ramenId
                    }
                    return fetch(`${API_BASE_URL}/remove-tags-ramen`, {
                        method: 'PUT',
                        body: JSON.stringify(postBody),
                        headers: {
                            // Authorization: `Bearer ${authToken}`,
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(res => res.json())
                    .then(result => {
                        this.setState({confirm: false})
                    })
                    .catch(err => console.log(err))
                }}>
                    <h2>Please check to make sure the following is correct:</h2>
                    <ul className="admin__confirm">
                        <li className="admin__confirm__name">Name of Ramen: {findRamenName}</li>
                        <li className="admin__confirm__name">Name of Tag: {findTagName}</li>
                    </ul>
                    <button>Confirm Submission</button>
                </form>
            </section>
            )
        } else {
            return (
                <section className="admin">
                    {navBar}
                    <div className="container">
                        {menu}
                    </div>
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
    ramen: state.ramen.data,
    tags: state.ramen.tagData
});

// Deal with update blocking - https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking
export default withRouter(connect(mapStateToProps)(Admin));
