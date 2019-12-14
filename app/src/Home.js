import React, { Component } from 'react';
import AppNav from './AppNav.js';
class Home extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
                <AppNav></AppNav>
                <h2>Welcome to the Home page</h2>
            </div> );
    }
}
 
export default Home;