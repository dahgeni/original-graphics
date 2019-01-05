import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import Navbar from './Navbar';
import Footer from './Footer';
import LandingPage from './LandingPage';
import GalleryList from './Gallery/GalleryList';

class App extends Component {

  render() {
    return (
        <BrowserRouter>
          <div>
            <Navbar/>
            <Route path='/' exact component={LandingPage}/>
            <Route path='/gallery' exact component={GalleryList}/>
            <Footer/>
          </div>
        </BrowserRouter>
    )
  }
}

export default App;
