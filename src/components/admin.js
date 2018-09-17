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
            confirm: '',
            editRamenCompanyValue: '',
            ramenCompanyId: ''
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
                    <li onClick={() => this.setState({tab: 'delete'})} className="admin__nav__ul__li">Edit/Delete Ramen/Company/Tag</li>
                </ul>
            </nav>
            )

        const companyList = this.state.companies.map((company) => {
            return (
                <li className="pointer-cursor" value={company.id} key={company.id}className="admin__company-list__item"
                    onClick={() => {
                    this.setState({
                        editRamenCompanyValue: company.id,
                        ramenCompanyId: company.id
                    })
                }}>
                    <a className="pointer-cursor">{company.name} : {company.id}</a>
                </li>
            ) 
        })
        const ramenList = this.props.ramen.map((ramen) => {
            return (
                <li key={ramen.id} className="admin__ramen-list__item">
                    <p>{ramen.name} : <a className="">{ramen.id}</a></p>
                </li>
            )
        })
        const tagList = this.props.tags.map((tag) => {
            return (
                <li className="" key={tag.id} className="admin__tag-list__item">
                    <p>{tag.name} : <a className="">{tag.id}</a></p>
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
                        <input required value={this.state.ramenCompanyId} onChange={(event) => this.setState({ramenCompanyId: event.target.value})} className="admin__input" />
                        <label className="admin__label">Product Image URL</label>
                        <input required onChange={(event) => this.setState({ramenImageUrl: event.target.value})} className="admin__input url-input" />
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
                        <input required onChange={(event) => this.setState({companyUrl: event.target.value})} className="admin__input url-input" />
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
        } else if (this.state.tab === 'delete') {
            const ramen = this.props.ramen.map((ramen) => {
                return (
                    <li key={ramen.id} value={ramen.id} className="admin__delete__li">
                        <p className="admin__delete__text">
                        <button className="admin__edit__button" value={ramen.id} onClick={(event) => this.setState({
                            editRamen: ramen.name, 
                            editRamenId: ramen.id,
                            editRamenNameValue: ramen.name,
                            editRamenCompanyValue: ramen.companyId.id,
                            editRamenImageValue: ramen.image
                        })}>Edit</button>
                        <button className="admin__delete__button" value={ramen.id} onClick={(event) => this.setState({deleteRamen: ramen.name, deleteRamenId: ramen.id})}>Delete</button>
                        {ramen.name}</p>
                    </li>
                )
            });
            const tags = this.props.tags.map((tag) => {
                return (
                    <li key={tag.id} value={tag.id} className="admin__delete__li">
                        <p className="admin__delete__text">
                        <button className="admin__edit__button" value={tag.id} onClick={(event) => this.setState({editTag: tag.name, editTagId: tag.id})}>Edit</button>                        
                        <button className="admin__delete__button" value={tag.id} onClick={(event) => this.setState({deleteTag: tag.name, deleteTagId: tag.id})}>Delete</button>
                        {tag.name}</p>
                    </li>
                )
            });
            const companies = this.state.companies.map((company) => {
                return (
                    <li key={company.id} value={company.id} className="admin__delete__li">
                        <p className="admin__delete__text">
                        <button className="admin__edit__button" value={company.id} onClick={(event) => this.setState({editCompany: company.name, editCompanyId: company.id})}>Edit</button>                        
                        <button className="admin__delete__button" value={company.id} onClick={(event) => this.setState({deleteCompany: company.name, deleteCompanyId: company.id})}>Delete</button>
                        {company.name}</p>
                    </li>
                )
            });
            menu = (
                <div className="admin">
                    <h2>Edit/Delete Ramen/Company/Tag</h2>
                    <h3>Ramen</h3>
                    <ul className="admin__delete__ramen-ul">
                        {ramen}
                    </ul>
                    <h3>Tags</h3>
                    <ul className="admin__delete__ramen-ul">
                        {tags}
                    </ul>
                    <h3>Companies</h3>
                    <ul className="admin__delete__ramen-ul">
                        {companies}
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
                <section className="admin">
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
            if (this.state.deleteRamenId) {
                const ramenInfo = this.props.ramen.filter((ramen) => String(ramen.id) === String(this.state.deleteRamenId))[0];
                return (
                    <section className="admin">
                        <div className="container">
                            <h1>Are you sure you want to delete this ramen?</h1>
                            <p className="confirmText">{this.state.deleteRamen}</p>
                            <img className="confirmImg" src={ramenInfo.image}/>
                            <button className="confirmDeleteButton"
                            onClick={() => {
                                return fetch(`${API_BASE_URL}/ramen/${this.state.deleteRamenId}`, {
                                    method: 'DELETE'
                                })
                                .then((res) => {
                                    window.location.reload();
                                    this.setState({deleteRamenId: null, deleteRamen: null});
                                })
                                .catch(err => console.log(err))
                            }}
                            >Confirm Deletion</button>
                            <button className="confirmCancelButton" onClick={() => this.setState({deleteRamenId: null, deleteRamen: null})}>Cancel Deletion</button>
                        </div>
                    </section>
                )
            } else if (this.state.deleteTagId) {
                const tagInfo = this.props.tags.filter((tag) => String(tag.id) === String(this.state.deleteTagId))[0];
                return (
                    <section className="admin">
                        <div className="container">
                            <h1>Are you sure you want to delete this tag?</h1>
                            <p className="confirmText">{this.state.deleteTag}</p>
                            <img className="confirmImg" src={tagInfo.image}/>
                            <button className="confirmDeleteButton"
                            onClick={() => {
                                return fetch(`${API_BASE_URL}/tags/${this.state.deleteTagId}`, {
                                    method: 'DELETE'
                                })
                                .then((res) => {
                                    window.location.reload();
                                    this.setState({deleteTagId: null, deleteTag: null});
                                })
                                .catch(err => console.log(err))
                            }}
                            >Confirm Deletion</button>
                            <button className="confirmCancelButton" onClick={() => this.setState({deleteTagId: null, deleteTag: null})}>Cancel Deletion</button>
                        </div>
                    </section>
                )
            } else if (this.state.deleteCompanyId) {
                const companyInfo = this.state.companies.filter((company) => String(company.id) === String(this.state.deleteCompanyId))[0];
                return (
                    <section className="admin">
                        <div className="container">
                            <h1>Are you sure you want to delete this company?</h1>
                            <p className="confirmText">{this.state.deleteCompany}</p>
                            <img className="confirmImg" src={companyInfo.image}/>
                            <button className="confirmDeleteButton"
                            onClick={() => {
                                return fetch(`${API_BASE_URL}/company/${this.state.deleteCompanyId}`, {
                                    method: 'DELETE'
                                })
                                .then((res) => {
                                    window.location.reload();
                                    this.setState({deleteCompanyId: null, deleteCompany: null});
                                })
                                .catch(err => console.log(err))
                            }}
                            >Confirm Deletion</button>
                            <button className="confirmCancelButton" onClick={() => this.setState({deleteCompanyId: null, deleteCompany: null})}>Cancel Deletion</button>
                        </div>
                    </section>
                )
            } else if (this.state.editRamenId) {
                const companyListNonClick = this.state.companies.map((company) => {
                    return (
                        <li className="" value={company.id} key={company.id}className="admin__company-list__item">
                            <p className="">{company.name} : {company.id}</p>
                        </li>
                    ) 
                })
                const ramenInfo = this.props.ramen.filter((ramen) => String(ramen.id) === String(this.state.editRamenId))[0];
                return (
                    <section className="admin">
                        <div className="container">
                            <h1>Edit Ramen</h1>
                            <form onSubmit={(event) => {
                                    event.preventDefault()
                                }}
                                className="admin__edit-form">
                                <label className="admin__edit-form__label">Ramen Name</label>
                                <input 
                                onChange={(event) => this.setState({editRamenNameValue: event.target.value})} 
                                defaultValue={ramenInfo.name}
                                className="admin__edit-form__input"/>
                                <label className="admin__edit-form__label">Company ID</label>
                                <input 
                                onChange={(event) => this.setState({editRamenCompanyValue: event.target.value})} 
                                defaultValue={ramenInfo.companyId.id} 
                                className="admin__edit-form__input"/>
                                <label className="admin__edit-form__label">Product Image URL</label>
                                <input 
                                onChange={(event) => this.setState({editRamenImageValue: event.target.value})} 
                                defaultValue={ramenInfo.image} 
                                className="admin__edit-form__input url-input"/>
                                <button className="confirmDeleteButton"
                                    onClick={() => {
                                        const postBody = {
                                            name: this.state.editRamenNameValue,
                                            companyId: this.state.editRamenCompanyValue,
                                            image: this.state.editRamenImageValue
                                        }
                                        return fetch(`${API_BASE_URL}/ramen/${this.state.editRamenId}`, {
                                            method: 'PUT',
                                            body: JSON.stringify(postBody),
                                            headers: {
                                                // Authorization: `Bearer ${authToken}`,
                                                'Content-Type': 'application/json'
                                            }
                                        })
                                        .then((res) => {
                                            window.location.reload();
                                            this.setState({editRamenId: null, editRamen: null});
                                        })
                                        .catch(err => console.log(err))
                                    }}
                                >Confirm Edit</button>
                                <button className="confirmCancelButton" onClick={() => this.setState({editRamenId: null, editRamen: null})}>Cancel Edit</button>
                            </form>
                            <ul className="admin__company-list">
                            <h2>Company ID Information</h2>
                                {companyListNonClick}
                            </ul>
                        </div>
                    </section>
                )
            } else if (this.state.editTagId) {
                const tagInfo = this.props.tags.filter((tag) => String(tag.id) === String(this.state.editTagId))[0];
                return (
                    <section className="admin">
                        <div className="container">
                            <h1>Edit Tag</h1>
                            <form onSubmit={(event) => {
                                    event.preventDefault()
                                }}
                                className="admin__edit-form">
                                <label className="admin__edit-form__label">Tag Name</label>
                                <input 
                                onChange={(event) => this.setState({editTagNameValue: event.target.value})} 
                                defaultValue={tagInfo.name}
                                className="admin__edit-form__input"/>
                                <button className="confirmDeleteButton"
                                    onClick={() => {
                                        const postBody = {
                                            name: this.state.editTagNameValue
                                        }
                                        return fetch(`${API_BASE_URL}/tags/${this.state.editTagId}`, {
                                            method: 'PUT',
                                            body: JSON.stringify(postBody),
                                            headers: {
                                                // Authorization: `Bearer ${authToken}`,
                                                'Content-Type': 'application/json'
                                            }
                                        })
                                        .then((res) => {
                                            window.location.reload();
                                            this.setState({editTagId: null, editTag: null});
                                        })
                                        .catch(err => console.log(err))
                                    }}
                                >Confirm Edit</button>
                                <button className="confirmCancelButton" onClick={() => this.setState({editTagId: null, editTag: null})}>Cancel Edit</button>
                            </form>
                        </div>
                    </section>
                )
            } else if (this.state.editCompanyId) {
                const companyInfo = this.state.companies.filter((company) => String(company.id) === String(this.state.editCompanyId))[0];
                return (
                    <section className="admin">
                        <div className="container">
                            <h1>Edit Company</h1>
                            <form onSubmit={(event) => {
                                    event.preventDefault()
                                }}
                                className="admin__edit-form">
                                <label className="admin__edit-form__label">Company Name</label>
                                <input 
                                onChange={(event) => this.setState({editCompanyNameValue: event.target.value})} 
                                defaultValue={companyInfo.name}
                                className="admin__edit-form__input"/>
                                <label className="admin__edit-form__label">Company Home Page URL</label>
                                <input 
                                onChange={(event) => this.setState({editCompanyUrlValue: event.target.value})} 
                                defaultValue={companyInfo.companyUrl}
                                className="admin__edit-form__input"/>
                                <button className="confirmDeleteButton"
                                    onClick={() => {
                                        const postBody = {
                                            name: this.state.editCompanyNameValue,
                                            companyUrl: this.state.editCompanyUrl
                                        }
                                        return fetch(`${API_BASE_URL}/company/${this.state.editCompanyId}`, {
                                            method: 'PUT',
                                            body: JSON.stringify(postBody),
                                            headers: {
                                                // Authorization: `Bearer ${authToken}`,
                                                'Content-Type': 'application/json'
                                            }
                                        })
                                        .then((res) => {
                                            window.location.reload();
                                            this.setState({editCompanyId: null, editCompany: null});
                                        })
                                        .catch(err => console.log(err))
                                    }}
                                >Confirm Edit</button>
                                <button className="confirmCancelButton" onClick={() => this.setState({editCompanyId: null, editCompany: null})}>Cancel Edit</button>
                            </form>
                        </div>
                    </section>
                    )
            }

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

export default withRouter(connect(mapStateToProps)(Admin));
