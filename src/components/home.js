import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'; 

export default function Home() {
    return (
        <Router>
            <div className="home">
                <main>
                    <Switch>
                        <Route exact path="/signup" component={SignUp} />
                    </Switch>
                </main>
            </div>
        </Router>
    )
}

