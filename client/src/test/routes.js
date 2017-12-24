import React from 'react';
import { Route, Switch } from 'react-router-dom';
import manifestComponents from './manifest.js';

const TestRoutes = ({ match }) => (
  <Switch>
    {
       Object.keys(manifestComponents).map((component, i) => {
         const componentData = manifestComponents[component];
         let Component;
         if (i === 0) {
           Component = componentData.default || componentData.components.default || componentData.component.default;
         } else {
           Component = componentData.default || componentData.components.default;
         }
         const { props } = componentData;
         return (
           <Route
             path={`${match.url}/${component}`}
             key={component}
             render={() =>
               <Component {...props} />
             }
           />
         );
       })
     }
  </Switch>
);

export default TestRoutes;
