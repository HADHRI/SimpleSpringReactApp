import React, { Component } from 'react';
import {Route, BrowserRouter as Router ,Switch} from 'react-router-dom';
import Home from './Home';
import Category from './Category'
import Expense from './Expense'
class App extends Component {
    state = {  }
    render() { 
        return ( 
            <Router>
                <Switch>
                <Route path='/' exact={true} component={Home}></Route>
                <Route path='/categories' exact={true} component={Category}></Route>
                <Route path='/expenses' exact={true} component={Expense}></Route>
                </Switch>
            </Router>
         );
    }
}
 
export default App;