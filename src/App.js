import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import './App.scss';
import { Router } from 'react-router-dom';
import store from './redux/store';
import Routes from './Routing';

export const history = createBrowserHistory();
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Router history={history}>
            <Routes />
          </Router>
        </div>
      </Provider>
    );
  }
}

export default App;
