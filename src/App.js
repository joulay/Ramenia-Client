import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';

import { refreshAuthToken } from './actions/auth';

import Home from './components/home';
import ProductPage from './components/product-page';
import Admin from './components/admin';
import Nav from'./components/nav';

import {getRamenData, getTagData, getCompanyData} from './actions/ramen';

export class App extends React.Component {
    

    componentDidUpdate(prevProps) {
        if (!prevProps.loggedIn && this.props.loggedIn) {
            // When we are logged in, refresh the auth token periodically
            this.startPeriodicRefresh();
        } else if (prevProps.loggedIn && !this.props.loggedIn) {
            // Stop refreshing when we log out
            this.stopPeriodicRefresh();
        }
    }

    componentDidMount() {
        this.props.dispatch(getRamenData())
        this.props.dispatch(getTagData())
        this.props.dispatch(getCompanyData())
    }

    componentWillUnmount() {
        this.stopPeriodicRefresh();
    }

    startPeriodicRefresh() {
        this.refreshInterval = setInterval(
            () => this.props.dispatch(refreshAuthToken()),
            59 * 60 * 1000 // One hour
        );
    }

    stopPeriodicRefresh() {
        if (!this.refreshInterval) {
            return;
        }

        clearInterval(this.refreshInterval);
    }

    render() {
        return (
            <main className="app">
                <div className="nav-div">
                    <Nav />
                </div>
                <div className="main-div">
                    <Route exact path="/" component={Home} />
                    <Route exact path="/product-page" component={ProductPage} />
                    <Route exact path="/admin" component={Admin}/>
                </div>
            </main>
            
        );
    }
}

const mapStateToProps = state => ({
    hasAuthToken: state.auth.authToken !== null,
    currentUser: state.auth.currentUser,
    loggedIn: state.auth.currentUser !== null
});

export default withRouter(connect(mapStateToProps)(App));
