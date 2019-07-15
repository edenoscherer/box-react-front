import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import BoxPage from './pages/Box/Box.page';
import MainPage from './pages/Main/Mian.page';


const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={MainPage} />
      <Route path="/box/:id" component={BoxPage} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
