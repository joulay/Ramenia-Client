import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './components/home';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import store from './store';

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Home />
        </Router>
    </Provider>,
    document.getElementById('root')
);

// ReactDOM.render(<Home />, document.getElementById('root'));
// registerServiceWorker();
