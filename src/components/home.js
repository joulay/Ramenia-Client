import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';

// import { BrowserRouter as Router } from 'react-router-dom'; 
//font-family: 'Kosugi Maru', sans-serif;

class Home extends React.Component {

    render() {
        return (
        <Router>
            <div className="home">
                <main>
                    
                </main>
            </div>
        </Router>
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
