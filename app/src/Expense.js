import React, { Component } from 'react';
import AppNav from './AppNav'
class Expense extends Component {
    state = {  }
    render() { 
        return ( 
            <div><AppNav></AppNav> 
            <h2>Expenses</h2>
            </div>);
    }
}
 
export default Expense;