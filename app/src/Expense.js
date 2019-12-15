import React, { Component } from 'react';
import AppNav from './AppNav';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Table,FormGroup, Button,Container,Form,Label,Input} from 'reactstrap';
import {Link} from 'react-router-dom'
import Category from './Category';
class Expense extends Component { 

    emptyItem = {
        id : '103',
        expenseDate : new Date(),
        location: '',
        categories: [1,'Travel']
    }

    async componentDidMount(){
        const response =await fetch('api/categories');
        const body= await response.json();
        this.setState({categories :body, isLoading : false})
        const responseExp =await fetch('api/expenses');
        const bodyExp= await responseExp.json();
        this.setState({expenses :bodyExp, isLoading : false})
    }
 
    constructor(props){
        super(props)
        this.state = {
            date:new Date(),
            isLoading : true,
            expenses :[],
            categories :[],
            item: this.emptyItem
     }
    }
  


  
  
    render() { 
        const title = <h3>Add Expense </h3>
        const {categories} =this.state;
        const {expenses,isLoading}=this.state;

       let categoriesList=
            categories.map(category =>
                <option id={category.id}>
                    {category.name}
              </option>)
        let rows=
            expenses.map((expense)=>
            <tr>
                <td>{expense.description}</td>
                <td>{expense.location}</td>
                <td>{expense.expenseDate}</td>
                <td>{expense.category.name}</td>
                <td><Button size="sm" color="dangar" onClick={ () =>this.remove(expense)} ></Button></td>
                
            </tr>)
        
        if(isLoading)
            return(<div>Loading...</div>)
        return ( 
    
            <div>
            <AppNav></AppNav> 
            <Container>
                {title}
                <Form>
                    <FormGroup>
                        <Label for="title">Title</Label>
                        <Input type="text" name="title" id="title" onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="category">Category</Label>
                        <select>
                            {categoriesList}
                        </select>
                      
                        <Input type="text" name="category" id="category" onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="expenseDate">Expense Date</Label>
                        <DatePicker selected={this.state.date} onChange={this.handleChange}></DatePicker>
                    </FormGroup>
                    <div className="row">
                    <FormGroup className="col-md-4 mb-3">
                        <Label for="location">Location</Label>
                        <Input type="text" name="location" id="location" onChange={this.handleChange}></Input>
                    </FormGroup>
                    </div>
                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>{' '}
                        <Button color="secondary" tag={Link} to="/">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        {' '}
        <Container>
            <h3>Expense List</h3>
            <Table className="mt-4">
                <thead>
                    <tr>
                        <th width="20%">Description</th>
                        <th width="10%">Location</th>
                        <th width="10%">Category</th>  
                        <th width="10%">Action</th>

                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>

            </Table>
        </Container>
        </div> );
    }
}
 
export default Expense;