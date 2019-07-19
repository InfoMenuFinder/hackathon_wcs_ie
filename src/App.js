import React, { Component } from 'react';
import './App.css';
import Home from './Components/Home';
import MapRestaurants from './Components/MapRestaurants';
import Menu from './Components/Menu';
import { Route, BrowserRouter, Switch, NavLink } from 'react-router-dom';

export default class App extends Component {

  render() {
    return (
      <BrowserRouter className='browser'>
        <div className='navBar'>
          <NavLink exact to='/' className='tabLike' activeClassName="selected"> Home</NavLink>
          <NavLink to='/menu' className='tabLike' activeClassName="selected"> Menu</NavLink>
          <NavLink to='/map' className='tabLike' activeClassName="selected"> Map</NavLink>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/menu' component={Menu}/>
            <Route path='/map' component={MapRestaurants}/>
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}
