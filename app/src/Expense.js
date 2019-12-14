import React, { Component } from 'react';
import AppNav from './AppNav';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FormGroup, Button,Container,Form,Label,Input} from 'reactstrap';
import {Link} from 'react-router-dom'
import Category from './Category';
class Expense extends Component { 

    emptyItem = {
        id : '103',
        expenseDate : new Date(),
        location: '',
        categories: [1,'Travel']
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

  
    async componentDidMount(){
        const response =await fetch('api/categories');
        const body= await response.json();
        this.setState({categories :body, isLoading : false})
    }
    render() { 
        const title = <h3>Add Expense </h3>
        const {expenses,isLoading,categories} =this.state;

       let categoriesList=
            categories.map(category =>
                <option id={category.id}>
                    {category.name}
              </option>)

        
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
            </div>);
    }
}
 
export default Expense;