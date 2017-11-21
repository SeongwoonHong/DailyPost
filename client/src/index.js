import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import Materialize from 'materialize-css';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
// import ReactMaterialize from 'react-materialize';
// const Materialize = window.Materialize;
const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(thunk));

render(
    <Provider store={store}>
      <BrowserRouter>
        <div className="container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>, document.getElementById('root'));
