// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App/App';
// import './index.css';
//
// ReactDOM.render(
//   <App />,
//   document.getElementById('root')
// );
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import Materialize from 'materialize-css';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';
import App from './components/App';
import Home from './components/Home';
import Login from './components/Login';
// import ReactMaterialize from 'react-materialize';
// const Materialize = window.Materialize;
// const $ = window.$;

const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(thunk));

render(
    <Provider store={store}>
      <BrowserRouter>
        <div className="container">
          <App />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>, document.getElementById('root'));
