import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';
import Login from './components/Login';
import Register from './components/Register';
import Landing from './components/Landing';
import './index.css';
const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(thunk));
const isDevelopment = process.env.NODE_ENV === 'development';

let TestRoutes;
if (isDevelopment) {
  TestRoutes = require('./test/routes').default;
}

render(
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <Switch>
            {
              isDevelopment
                ? <Route path="/test" component={ TestRoutes } />
                : null
            }
            <Route exact path="/" component={Landing} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/landing" component={Landing} />
            <Redirect from="*" exact to="/" />
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>, document.getElementById('root'));
