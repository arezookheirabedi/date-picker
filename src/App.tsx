import './styles/style.scss';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import React from 'react';
import "src/helpers/prototypes"
import PrivateLayout, {PrivateRoute} from './components/Layout/Private';
import {PublicRoute} from './components/Layout/Public';
import NotFound from './containers/Errors/NotFound';
import Authentication from './containers/Authentication';
import Home from './containers/Home';

const App: React.FC<any> = () => (
  <div className="min-h-screen">
    <Switch>
      <PrivateRoute component={PrivateLayout} path="/dashboard"/>
      <PublicRoute restricted component={Authentication} path="/login"/>
      <PublicRoute component={Home} path="/" exact />
      <Route component={NotFound}/>
    </Switch>
  </div>
);

export default App;
